import {APP_CONFIG} from '../../constants';
let request = require('request-promise');

let uninitializedRequests = [];

// Used for requests that are 'made' before api has been initialized from twitch.  Upon API resolution from
//   twitch, all earlier requests are resolved.
function uninitializedRequest(path, query) {
    return new Promise((resolve, reject) => {
        let key = this;
        uninitializedRequests.push(function invoke() {
            API[key](path, query)
                .then(resolve);
        });
    });
}

let API = {
    user: uninitializedRequest.bind('user'),
    channel: uninitializedRequest.bind('channel'),
    search: uninitializedRequest.bind('search'),
    streams: uninitializedRequest.bind('streams'),
    ingests: uninitializedRequest.bind('ingests'),
    teams: uninitializedRequest.bind('teams')
};

_initialize()
    .then(() => {
        uninitializedRequests.forEach(_request => _request());
    });

function _initialize() {
    let requestConfig = {
        uri: APP_CONFIG.TWITCH.API_URL,
        headers: _apiRequestHeaders(),
        json: true
    };
    return request(requestConfig)
        .then(response => {
            for (let key in response._links) {
                if (!response._links.hasOwnProperty(key)) {
                    continue;
                }
                API[key] = _buildApiRequest(response._links[key]);
            }
        });
}

function _buildApiRequest(url) {
    return function (path, query = {}) {
        if (path[0] === '/') {
            path = path.substr(1);
        }

        let requestConfig = {
            uri: `${url}/${path}`,
            headers: _apiRequestHeaders(),
            qs: query,
            json: true
        };

        return request(requestConfig);
    }
}

function _apiRequestHeaders() {
    return {
        'Client-ID': APP_CONFIG.TWITCH.API_KEY
    };
}

export {
    API
}