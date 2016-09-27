import SlackCommand from '../SlackCommand';
import SlackResponse from '../SlackResponse';
import invalidCommand from './invalid';
import bungie from '../../destiny_api';
import {PLATFORM, ACTIVITY_MODE, GENDER_HASH, RACE_HASH, CLASS_HASH} from '../../destiny_api/constants';
import Convert from '../../utilities/convert';

const COLOR = {
    ALPHA: '#281891',
    BRAVO: '#b8211e',
    ORANGE: '#F35A00',
    NEUTRAL: '#D2D2D2'
};

let _ = require('lodash');
let request = require('request-promise');

let crucibleCommand = new SlackCommand();
crucibleCommand.registerCommandOption(['pgcr', 'carnage'], postGameCarnageReport);
crucibleCommand.registerCommandOption(['individual', 'stats'], individualStats);
crucibleCommand.registerCommandOption(['account-stats', 'accountstats', 'playerstats', 'player-stats'], getStatsFor);
crucibleCommand.registerDefaultAction(invalidCommand);
export default crucibleCommand;

function postGameCarnageReport(slackContext, params) {
    let gamerTag = params;

    return _getMembershipId(gamerTag)
        .then(_getCharacterId)
        .then(_getActivityHistory)
        .then(activityHistory => _getPGCR(activityHistory.activities[0].activityDetails.instanceId))
        .then(pgcr => {
            let attachments = pgcr.entries.map(entry => {
                let clanText   = entry.player.clanTag ? `[${entry.player.clanTag}]` : ``,
                    attachment = {
                        title: `${entry.player.destinyUserInfo.displayName} ${clanText} - ${entry.player.lightLevel} ${entry.player.characterClass}`,
                        text: ``,
                        color: COLOR.ORANGE,
                        mrkdwn_in: ['text', 'pretext']
                    };

                attachment.text += `*Score*: _${entry.score.basic.displayValue}_\t `;
                attachment.text += `*Kills*: ${entry.values.kills.basic.displayValue}\t `;
                attachment.text += `*Deaths*: ${entry.values.deaths.basic.displayValue}\t `;
                attachment.text += `*Assists*: ${entry.values.assists.basic.displayValue}\t `;
                attachment.text += `*KD*: ${entry.values.killsDeathsRatio.basic.displayValue}\t `;
                attachment.text += `*KDA*: ${entry.values.killsDeathsAssists.basic.displayValue}\t `;

                if (entry.values.team) {
                    switch (entry.values.team.basic.displayValue.trim()) {
                        case 'Alpha':
                            attachment.color = COLOR.ALPHA;
                            break;
                        case 'Bravo':
                            attachment.color = COLOR.BRAVO;
                            break;
                    }
                    attachment.text += `*Team*: ${entry.values.team.basic.displayValue}\t`;
                }

                attachment.text += `*Result*: ${entry.values.standing.basic.displayValue}\t`;

                attachment.thumb_url = `http://bungie.net${entry.player.destinyUserInfo.iconPath}`;

                return attachment;
            });

            let response = new SlackResponse(slackContext, {
                text: `Last Activity: Post Game Carnage Report for *${gamerTag}*`,
                type: 'in_channel',
                attachments
            });

            return response.send(true);
        });
}

function individualStats(slackContext, params) {
    let gamerTag = params;

    return _getMembershipId(gamerTag)
        .then(_getCharacterId)
        .then(_getActivityHistory)
        .then(activityHistory => {
            let activityDetails = activityHistory.activities[0].activityDetails,
                values          = activityHistory.activities[0].values,
                attachment      = {
                    title: `${ACTIVITY_MODE.toString(activityDetails.mode)} - ${activityHistory.activities[0].period}`,
                    text: ``,
                    mrkdwn_in: [
                        "text",
                        "pretext"
                    ]
                };

            attachment.text += `*Kills*: ${values.kills.basic.displayValue}\n`;
            attachment.text += `*Deaths*: ${values.deaths.basic.displayValue}\n`;
            attachment.text += `*Assists*: ${values.assists.basic.displayValue}\n`;
            attachment.text += `*KD*: ${values.killsDeathsRatio.basic.displayValue}\n`;
            attachment.text += `*KDA*: ${values.killsDeathsAssists.basic.displayValue}\n`;
            attachment.text += `*Result*: ${values.standing.basic.displayValue}\n`;

            let response = new SlackResponse(slackContext, {
                text: `Last Activity: Stats for *${gamerTag}*`,
                type: `in_channel`,
                attachments: [attachment]
            });

            return response.send(true);
        });
}

function getStatsFor(slackContext, params) {
    let modeRegex = /-mode:(.*?)\s/g,
        teamRegex = /-teams\s/g;
    let modesMatches = params.match(modeRegex) || [],
        teamsMatches = params.match(teamRegex) || [],
        activityMode = modesMatches.length ? _getActivityModeFromQuery(modesMatches[0]) : ACTIVITY_MODE.AllPvP;

    let gamerTags = params.replace(modeRegex, '').replace(teamRegex, '').split(',').map(gt => {
        return gt.trim();
    });

    let generateTeams = !!teamsMatches.length;
    let promises = [];

    gamerTags.forEach(gamerTag => {
        promises.push(
            _getMembershipId(gamerTag)
                .then(membershipId => { return _getCharactersWithStats(membershipId, activityMode); })
                .then(_aggregateCharacterStats)
                .then(result => {
                    result.gamerTag = gamerTag;
                    return result;
                })
        )
    });
    Promise.all(promises)
        .then(players => {
            return _.sortBy(players, (o) => {
                return o.aggregateStats.killsDeathsRatio
            }).reverse();
        })
        .then(players => {
            if (!generateTeams) {
                return players;
            }
            let alpha = [],
                bravo = [];

            let isAlpha = true;
            while (players.length) {
                let team = isAlpha ? alpha : bravo,
                    player;

                if (players.length === 2 &&
                    (
                        (alpha.length && bravo.length && alpha.length - bravo.length === 0) ||
                        (!alpha.length && !bravo.length)
                    )) {
                    player = players.shift();
                    player.teamColor = COLOR.BRAVO;
                    bravo.push(player);
                    player = players.shift();
                    player.teamColor = COLOR.ALPHA;
                    alpha.push(player);
                    break;
                }

                player = players.shift();
                player.teamColor = isAlpha ? COLOR.ALPHA : COLOR.BRAVO;
                team.push(player);
                player = players.pop();
                player.teamColor = isAlpha ? COLOR.ALPHA : COLOR.BRAVO;
                team.push(player);

                isAlpha = !isAlpha;
            }

            return alpha.concat(bravo);
        })
        .then(players => {
            let attachments = [];

            players.forEach(player => {
                let attachment = {
                    title: `${player.gamerTag}`,
                    footer: '',
                    title_link: `https://www.bungie.net/en/Profile/254/${player.characters[0].membershipId}`,
                    color: player.teamColor || COLOR.NEUTRAL,
                    text: '',
                    mrkdwn_in: [
                        "text",
                        "pretext"
                    ]
                };
                attachment.footer += ` <http://destinytracker.com/destiny/overview/xbox/${player.gamerTag} | Tracker> |`;
                attachment.footer += ` <https://my.destinytrialsreport.com/xbox/${player.gamerTag} | Trials Report> |`;
                attachment.footer += ` <http://guardian.gg/en/profile/1/${player.gamerTag} | guardian.gg> |`;
                attachment.footer += ` <https://www.bungie.net/en/Profile/254/${player.characters[0].membershipId} | bungie.net>`;

                attachment.text += `*KD: * ${player.aggregateStats.killsDeathsRatio}\t `;
                attachment.text += `*KDA: * ${player.aggregateStats.killsDeathsAssists}\t `;
                attachment.text += `*Combat Rating: * ${player.aggregateStats.combatRating}\t `;
                attachment.text += `*W/L: * ${player.aggregateStats.winLossRatio}`;
                attachments.push(attachment);
            });

            let response = new SlackResponse(slackContext, {
                text: `*Crucible Stats - ${ACTIVITY_MODE.toString(activityMode)}*`,
                type: 'in_channel',
                attachments: attachments
            });

            response.send(true);
        });
}

function _getMembershipId(gamerTag, network) {
    return bungie.search.searchDestinyPlayer({
        membershipType: PLATFORM.LIVE,
        displayName: gamerTag
    }).then(_unwrapMembershipId);
}

function _getAccountSummary(membershipId) {
    return bungie.account.summary({
        membershipType: PLATFORM.LIVE,
        membershipId
    });
}

function _getCharactersWithStats(membershipId, activityMode = ACTIVITY_MODE.AllPvP) {
    return _getAccountSummary(membershipId)
        .then(accountSummaryResponse => {
            let promises = accountSummaryResponse.characters.map(character => {
                return bungie.stats.all({
                    membershipType: PLATFORM.LIVE,
                    membershipId,
                    characterId: character.characterBase.characterId,
                    modes: activityMode
                }).then(stats => {
                    let allStats = stats[_uncapitalize(ACTIVITY_MODE.toString(activityMode))];
                    allStats = allStats ? allStats.allTime : undefined;

                    return {
                        membershipId: character.characterBase.membershipId,
                        characterId: character.characterBase.characterId,
                        race: RACE_HASH.toString(character.characterBase.raceHash),
                        gender: GENDER_HASH.toString(character.characterBase.genderHash),
                        class: CLASS_HASH.toString(character.characterBase.classHash),
                        emblem: character.emblemPath,
                        background: character.backgroundPath,
                        stats: allStats
                    }
                })
            });
            return Promise.all(promises);
        });
}

function _aggregateCharacterStats(characters) {
    let aggregateStats = {
        assists: 0,
        combatRating: 0,
        deaths: 0,
        kills: 0,
        killsDeathsAssists: 0,
        killsDeathsRatio: 0,
        winLossRatio: 0
    };
    let charactersMissingStats = 0;
    characters.forEach(character => {
        if (!character.stats) {
            charactersMissingStats++;
            return;
        }
        for (let key in aggregateStats) {
            aggregateStats[key] += character.stats[key].basic.value;
        }
    });
    let divisor = characters.length - charactersMissingStats;
    divisor = divisor || 1;
    aggregateStats.combatRating /= divisor;
    aggregateStats.killsDeathsRatio /= divisor;
    aggregateStats.killsDeathsAssists /= divisor;
    aggregateStats.winLossRatio /= divisor;

    for (var key in aggregateStats) {
        aggregateStats[key] = Convert.toRoundedValue(aggregateStats[key], 2);
    }

    return {
        aggregateStats,
        characters
    }
}

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    return searchDestinyPlayerResponse[0].membershipId;
}

function _getCharacterId(membershipId) {
    return _getAccountSummary(membershipId)
        .then(accountSummaryResponse => {
            let character = accountSummaryResponse.characters[0];
            return {
                membershipId,
                characterId: character.characterBase.characterId
            };
        });
}

function _getActivityHistory({membershipId, characterId}) {
    return bungie.stats.activityHistory({
        membershipType: PLATFORM.LIVE,
        membershipId,
        characterId,
        mode: ACTIVITY_MODE.AllPvP
    });
}

function _getPGCR(activityId) {
    return bungie.stats.postGameCarnageReport({
        activityId
    });
}

function _uncapitalize(word) {
    return word[0].toLowerCase() + word.substr(1);
}

function _getActivityModeFromQuery(query) {
    let input = query.split(':');
    if(input.length < 2) {
        return ACTIVITY_MODE.AllPvP;
    }
    let mode = input[1].trim().toLowerCase();
    switch(mode) {
        case 'trials':
        case 'trialsofosiris':
            return ACTIVITY_MODE.TrialsOfOsiris;
        case 'skirmish':
        case 'salvage':
        case 'threevsthree':
        case '3v3':
            return ACTIVITY_MODE.ThreeVsThree;
    }
    return ACTIVITY_MODE.AllPvP;
}
