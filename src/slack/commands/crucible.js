import SlackCommand from '../SlackCommand';
import SlackResponse from '../SlackResponse';
import invalidCommand from './invalid';
import bungie from '../../destiny_api';
import {PLATFORM, ACTIVITY_MODE} from '../../destiny_api/constants';

let request = require('request-promise');

let crucibleCommand = new SlackCommand();
crucibleCommand.registerCommandOption(['pgcr', 'carnage'], postGameCarnageReport);
crucibleCommand.registerCommandOption(['individual', 'stats'], individualStats);
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
                let clanText = entry.player.clanTag ? `[${entry.player.clanTag}]` : ``,
                    attachment = {
                        title: `${entry.player.destinyUserInfo.displayName} ${clanText} - ${entry.player.lightLevel} ${entry.player.characterClass}`,
                        text: ``,
                        color: `#F35A00`,
                        mrkdwn_in: ['text', 'pretext']
                    };

                attachment.text += `*Score*: _${entry.score.basic.displayValue}_\t `;
                attachment.text += `*Kills*: ${entry.values.kills.basic.displayValue}\t `;
                attachment.text += `*Deaths*: ${entry.values.deaths.basic.displayValue}\t `;
                attachment.text += `*Assists*: ${entry.values.assists.basic.displayValue}\t `;
                attachment.text += `*KD*: ${entry.values.killsDeathsRatio.basic.displayValue}\t `;
                attachment.text += `*KDA*: ${entry.values.killsDeathsAssists.basic.displayValue}\t `;

                if(entry.values.team) {
                    switch(entry.values.team.basic.displayValue.trim()) {
                        case 'Alpha':
                            attachment.color = '#281891';
                            break;
                        case 'Bravo':
                            attachment.color = '#b8211e';
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
                attachment     = {
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

function _getMembershipId(gamerTag, network) {
    return bungie.search.searchDestinyPlayer({
        membershipType: PLATFORM.LIVE,
        displayName: gamerTag
    }).then(_unwrapMembershipId);
}

function _unwrapMembershipId(searchDestinyPlayerResponse) {
    return searchDestinyPlayerResponse[0].membershipId;
}

function _getCharacterId(membershipId) {
    return bungie.account.summary({
        membershipType: PLATFORM.LIVE,
        membershipId
    }).then(accountSummaryResponse => {
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