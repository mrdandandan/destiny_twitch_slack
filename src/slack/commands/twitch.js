import SlackCommand from '../SlackCommand';
import SlackMessage from '../SlackMessage';
import SlackResponse from '../SlackResponse';
import invalidCommand from './invalid';
import TwitchMonitor from '../../twitch/TwitchMonitor';
import {APP_CONFIG} from '../../constants';

let config  = require('../../twitch.config.json'),
    request = require('request-promise');

let twitchMonitor      = new TwitchMonitor(config.streamers),
    onlineStreamers = [];

registerStreamWatcher();

let twitchCommand = new SlackCommand();
twitchCommand.registerCommandOption(['live', 'online', 'streaming', 'broadcasting'], live);
twitchCommand.registerCommandOption(['streamers'], streamers);
twitchCommand.registerDefaultAction(invalidCommand);
export default twitchCommand;

function live(slackContext, params) {
    return twitchMonitor.checkOnlineStreams()
        .then(checkNewlyOnlineStreams)
        .then(onlineStreams => {
            let response = new SlackResponse(slackContext);
            if(onlineStreams.length) {
                response.setText('Online Clan Twitch Streams');
                response.setType('in_channel');

                onlineStreams.forEach(stream => {
                    response.addAttachment(_buildStreamAttachment(stream.streamer, stream.stream));
                });
            } else {
                response.setText('No one is currently streaming');
                response.setType('ephemeral');
            }

            response.send(true);
        });
}

function streamers(slackContext, params) {
    let response = new SlackResponse(slackContext, {
        text: 'Monitored Twitch Streams',
        type: 'in_channel',
        attachments: [{text: config.streamers.map(streamer => streamer.name).join('\n')}]
    });

    response.send(true);
}

function _buildStreamAttachment(streamer, stream) {
    return {
        title: `<https://twitch.tv/${streamer.channel}|${streamer.name}> |${stream.channel.status || 'No status'}|`,
        text: `*Game*: ${stream.game} *Viewers*: ${stream.viewers} *Views*: ${stream.channel.views}`,
        thumb_url: stream.preview.medium,
        mrkdwn_in: ["text", "pretext", "title"]
    };
}

function checkNewlyOnlineStreams(onlineStreams) {
    let newlyOnline = [],
        allOnline = [];

    onlineStreams.forEach(stream => {
        allOnline.push(stream.streamer.name);
        if(onlineStreamers.indexOf(stream.streamer.name) !== -1) {
            return;
        }
        newlyOnline.push(stream);
    });
    onlineStreamers = allOnline;

    if(newlyOnline.length) {
        let message = new SlackMessage({
            text: 'Twitch Stream Started:'
        });

        newlyOnline.forEach(stream => {
            let attachment = _buildStreamAttachment(stream.streamer, stream.stream);
            attachment.title += ' just started streaming!';
            message.addAttachment(attachment);
        });

        message.send(APP_CONFIG.SLACK.TWITCH_MONITOR_HOOK);
    }

    return onlineStreams;
}

function registerStreamWatcher() {
    setInterval(() => {
        twitchMonitor.checkOnlineStreams()
            .then(checkNewlyOnlineStreams);
    }, 60000)
}