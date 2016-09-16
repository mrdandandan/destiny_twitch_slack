import {API} from './api';

export default class TwitchMonitor {
    constructor(streamers) {
        this.streamers = streamers;
    }

    checkOnlineStreams() {
        return new Promise((resolve, reject) => {
            let promises = [],
                onlineStreams = [];
            this.streamers.forEach(streamer => {
                promises.push(API.streams(streamer.channel).then((response) => {
                    response.streamer = streamer;
                    return response;
                }));
            });
            Promise.all(promises)
                .then(responses => {
                    responses.forEach(response => {
                        if(!response.stream) {
                            return;
                        }
                        onlineStreams.push({
                            streamer: response.streamer,
                            stream: response.stream
                        })
                    });
                    resolve(onlineStreams);
                })
        });
    }
}