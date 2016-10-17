import {APP_CONFIG} from '../constants';

import api from './api';
import slack from './slack';

import {DestinyApiRequest} from 'mrdandandan-destiny-api-module';
import {twitchRequest} from 'mrdandandan-twitch-module';
DestinyApiRequest.setApiKey(APP_CONFIG.BUNGIE.API_KEY);
twitchRequest.setApiKey(APP_CONFIG.TWITCH.API_KEY);

export default function routes(app) {
    app.use('/api', api);
    app.use('/slack', slack);
}