import SlackCommand from '../SlackCommand';
import SlackResponse from '../SlackResponse';
import invalidCommand from './invalid';
import bungie from 'mrdandandan-destiny-api-module';
import {PARAMETERS} from '../../destiny/constants';
import maps from '../../destiny/helpers/maps';

let request = require('request-promise');

let directorCommand = new SlackCommand();
directorCommand.registerCommandOption(['heroic', 'heroic-mods', 'heroic-modifiers', 'heroicmods', 'heroicmodifiers'], standardAdvisor.bind(this, 'heroicStrike', 'Current Heroic Strike Playlist Modifiers'));
directorCommand.registerCommandOption(['dailystory', 'daily-story', 'dailychapter', 'daily-chapter'], standardAdvisor.bind(this, 'dailyChapter', 'Daily Crucible'));
directorCommand.registerCommandOption(['dailycrucible', 'daily-crucible', 'dailypvp', 'daily-pvp'], standardAdvisor.bind(this, 'dailyCrucible', 'Daily Crucible'));
directorCommand.registerCommandOption(['weeklycrucible', 'weekly-crucible', 'weeklypvp', 'weekly-pvp'], standardAdvisor.bind(this, 'weeklyCrucible', 'Weekly Crucible'));
directorCommand.registerCommandOption(['nightfall', 'nightfall-mods', 'nightfall-modifiers', 'nightfallmods', 'nightfallmodifiers'], nightfallAdvisor);
directorCommand.registerDefaultAction(invalidCommand);
export default directorCommand;

function standardAdvisor(advisor, responseTitle, slackContext, params) {
    let _advisors;

    bungie.advisors.getPublicAdvisors()
        .then(advisors => {
            _advisors = advisors;

            let activityBundleHash = advisors[advisor] instanceof Array ?
                advisors[advisor][0].activityBundleHash :
                advisors[advisor].activityBundleHash;

            return _getActivity(activityBundleHash);
        })
        .then(_processActivity)
        .then(activity => {
            return _output(slackContext, responseTitle, activity);
        });

    function _processActivity(sectionActivity) {
        return new maps.Activity(sectionActivity, _advisors[advisor] instanceof Array ? _advisors[advisor][0] : _advisors[advisor]);
    }
}

function nightfallAdvisor(slackContext, params) {
    let _advisors;

    bungie.advisors.getPublicAdvisors()
        .then(advisors => {
            let genericNightfallManifestRequest = _getActivity(advisors.nightfall.activityBundleHash),
                specificNightfallManifestRequest = _getActivity(advisors.nightfall.specificActivityHash);
            _advisors = advisors;

            return Promise.all([genericNightfallManifestRequest, specificNightfallManifestRequest]);
        })
        .then(_processActivity)
        .then(activity => {
            return _output(slackContext, 'Current Nightfall', activity);
        });

    function _processActivity(promiseResults) {
        let [generic, specific] = promiseResults,
            merged = {
                activityName: `${generic.activityName} - ${specific.activityName}`,
                activityDescription: specific.activityDescription,
                icon: specific.icon,
                skulls: generic.skulls
            };

        return new maps.Activity(merged, _advisors.nightfall);
    }
}

function _getActivity(activityHash) {
    let payload = {};
    payload[PARAMETERS.ACTIVITY_ID] = activityHash;
    return bungie.manifest.getActivity(payload)
        .then(activityResponse => {
            return activityResponse.activity;
        });
}

function _attachment() {
    return {
        mrkdwn_in: ['text', 'pretext', 'title']
    }
}

function _skullsToAttachments(skulls) {
    return skulls.map(skull => {
        let skullAttachment = _attachment();
        skullAttachment.title = `${skull.displayName}`;
        skullAttachment.text = `_${skull.description}_`;
        skullAttachment.thumb_url = `http://bungie.net${skull.icon}`;

        return skullAttachment;
    });
}

function _output(slackContext, responseTitle, activity) {
    let response = new SlackResponse(slackContext, {
        text: responseTitle,
        type: 'in_channel'
    });

    let headerAttachment = _attachment();
    headerAttachment.title = `${activity.name}`;
    headerAttachment.text = activity.description.split('\n').map(text => {
        return `_${text}_`
    }).join('\n');
    headerAttachment.thumb_url = `http://bungie.net${activity.icon}`;

    // Add Attachments
    response.addAttachment(headerAttachment);
    if(activity.skulls) {
        _skullsToAttachments(activity.skulls).forEach(skullAttachment => response.addAttachment(skullAttachment));
    }

    response.send(true);
}