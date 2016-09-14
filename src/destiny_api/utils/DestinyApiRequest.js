import {APP_CONFIG, METHOD} from '../../constants';
import DestinyApiError from './DestinyApiError';
import DestinyAPIResponse from './DestinyApiResponse';
import url from 'url';
import {_extend as extend} from 'util';

var request = require('request-promise');

let privateProps = new WeakMap();
export default class DestinyApiRequest {
    constructor({path, requiredParameters = [], isPlatformRequest = true, method = METHOD.GET}) {
        if (!path) {
            throw 'DestinyApiRequest requires a path to be passed into constructor';
        }
        let baseUrl = APP_CONFIG.BUNGIE.API_URL,
            headers = {
                'X-API-Key': APP_CONFIG.BUNGIE.API_KEY,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

        if (isPlatformRequest) {
            baseUrl = url.resolve(baseUrl, APP_CONFIG.BUNGIE.API_PLATFORM);
        }
        // Cheesy hack because wtf node
        if (baseUrl[baseUrl.length - 1] !== '/') {
            baseUrl += '/';
        }

        privateProps.set(this, {
            path,
            requiredParameters,
            isPlatformRequest,
            method,
            baseUrl,
            headers
        });
    }

    getBaseUrl() {
        return privateProps.get(this).baseUrl;
    }

    addHeader(key, value) {
        this.getHeaders()[key] = value;
    }
    getHeaders() {
        return privateProps.get(this).headers;
    }

    getMethod() {
        return privateProps.get(this).method;
    }

    getPath() {
        return privateProps.get(this).path;
    }

    getRequiredParameters() {
        return privateProps.get(this).requiredParameters;
    }

    buildRequest() {
        let executeBungieRequest = function executeBungieRequest(params = {}) {
            let _requestProperties = extend({}, privateProps.get(this)),
                requestPayload = {},
                requestOptions;

            _requestProperties.requiredParameters.forEach(param => {
                if(!params.hasOwnProperty(param)) {
                    DestinyApiError(`Missing param \`${param}\` in request: \n\`${_requestProperties.path}\``);
                }
            });

            for(let param in params) {
                if(_requestProperties.requiredParameters.includes(param) && _requestProperties.path.includes(`{${param}}`)) {
                    continue;
                }
                requestPayload[param] = params[param];
            }

            // Populate path
            _getPathTokens(_requestProperties.path).forEach(token => {
                if(!params[token]) {
                    return;
                }
                _requestProperties.path = _requestProperties.path.replace(`{${token}}`, params[token]);
            });

            requestOptions = {
                method: _requestProperties.method,
                uri: url.resolve(_requestProperties.baseUrl, _requestProperties.path),
                headers: _requestProperties.headers,
                json: true
            };
            switch(_requestProperties.method) {
                case METHOD.GET:
                    requestOptions['qs'] = requestPayload;
                    break;
                case METHOD.POST:
                    requestOptions['body'] = requestPayload;
                    break;
            }

            return request(requestOptions)
                .then(DestinyAPIResponse.unwrap)
                .catch(DestinyAPIResponse.error);
        }.bind(this);
        executeBungieRequest.baseUrl = this.getBaseUrl();
        executeBungieRequest.method = this.getMethod();
        executeBungieRequest.path = this.getPath();
        executeBungieRequest.requiredParameters = this.getRequiredParameters();

        return executeBungieRequest;
    }
}

function _getPathTokens(path) {
    let matches = path.match(/\{(.*?)\}/g) || [];

    return matches.map(match => {
        return match.substring(1, match.length - 1);
    });
}