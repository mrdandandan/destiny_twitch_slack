import {METHOD} from '../constants';
import {_extend as extend} from 'util';
import apiError from './ApiError';
import url from 'url';

let request = require('request-promise');

let privateProps = new WeakMap();
export default class ApiRequest {
    constructor({path, routeBinding, requiredParameters = [], method = METHOD.GET}) {
        if (!path) {
            throw 'ApiRequest requires a path to be passed into constructor';
        }

        let baseUrl,
            headers = {};

        privateProps.set(this, {
            baseUrl,
            headers,
            method,
            path,
            requiredParameters,
            routeBinding
        });
    }

    getBaseUrl() {
        return privateProps.get(this).baseUrl;
    }

    setBaseUrl(baseUrl) {
        privateProps.get(this).baseUrl = baseUrl;
        return this.getBaseUrl();
    }

    addHeader(key, value) {
        this.getHeaders()[key] = value;
        return this.getHeaders();
    }

    getHeaders() {
        return privateProps.get(this).headers;
    }

    getMethod() {
        return privateProps.get(this).method;
    }

    setMethod(method) {
        privateProps.get(this).method = method;
        return this.getMethod();
    }

    getPath() {
        return privateProps.get(this).path;
    }

    setPath(path) {
        privateProps.get(this).path = path;
        return this.getPath();
    }

    addRequiredParameter(parameter) {
        let requiredParameters = this.getRequiredParameters();
        if (requiredParameters.includes(parameter)) {
            return false;
        }
        requiredParameters.push(parameter);
        return requiredParameters;
    }

    getRequiredParameters() {
        return privateProps.get(this).requiredParameters;
    }

    removeRequiredParameter(parameter) {
        let requiredParameters = this.getRequiredParameters(),
            index              = requiredParameters.indexOf(parameter);

        if (index === -1) {
            return false;
        }

        requiredParameters.splice(index, 1);
        return requiredParameters;
    }

    setRequiredParameters(parameters) {
        privateProps.get(this).requiredParameters = parameters;
        return this.getRequiredParameters();
    }

    getRouteBinding() {
        return privateProps.get(this).routeBinding;
    }

    setRouteBinding(routeBinding) {
        privateProps.get(this).routeBinding = routeBinding;
        return this.getRouteBinding();
    }

    appendRequestMetadata(request) {
        request.baseUrl = this.getBaseUrl();
        request.method = this.getMethod();
        request.path = this.getPath();
        request.requiredParameters = this.getRequiredParameters();
        request.routeBinding = this.getRouteBinding();

        return request;
    }

    buildRequest() {
        let executeApiRequest = function executeApiRequest(params = {}) {
            let _requestProperties = extend({}, privateProps.get(this)),
                requestPayload     = {},
                requestOptions;

            _requestProperties.requiredParameters.forEach(param => {
                if (!params.hasOwnProperty(param)) {
                    apiError(`Missing param \`${param}\` in request: \n\`${_requestProperties.path}\``);
                }
            });

            for (let param in params) {
                if (_requestProperties.requiredParameters.includes(param) && _requestProperties.path.includes(`{${param}}`)) {
                    continue;
                }
                requestPayload[param] = params[param];
            }

            // Populate path
            _getPathTokens(_requestProperties.path).forEach(token => {
                if (!params[token]) {
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
            switch (_requestProperties.method) {
                case METHOD.GET:
                    requestOptions['qs'] = requestPayload;
                    break;
                case METHOD.POST:
                    requestOptions['body'] = requestPayload;
                    break;
            }

            return request(requestOptions);
        }.bind(this);

        return this.appendRequestMetadata(executeApiRequest);
    }
}

function _getPathTokens(path) {
    let matches = path.match(/\{(.*?)\}/g) || [];

    return matches.map(match => {
        return match.substring(1, match.length - 1);
    });
}