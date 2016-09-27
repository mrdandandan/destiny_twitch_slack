import destiny_api from '../destiny_api';
import {METHOD} from '../constants';
import _ from 'lodash';

var express = require('express'),
    router  = express.Router(),
    api     = {};

for (var route in destiny_api) {
    if (!destiny_api.hasOwnProperty(route)) {
        continue;
    }
    api[route] = {};
    generateEndpoints(route, destiny_api[route]);
}

router.get('/reflect', (req, res) => {
    res.json(api);
});

function generateEndpoints(route, endpoints) {
    for (var endpoint in endpoints) {
        if (!endpoints.hasOwnProperty(endpoint)) {
            continue;
        }
        let request = endpoints[endpoint],
            path;

        if (request.hasOwnProperty('routeBinding')) {
            path = `/${route}/${endpoint}/${request.routeBinding}`;
        } else {
            path = `/${route}/${endpoint}`
        }

        registerRoute(path, request);

        api[route][endpoint] = {
            method: request.method,
            requiredParameters: request.requiredParameters,
            bungiePath: request.path,
            routeBinding: request.routeBinding,
            route: `~/api/${route}/${endpoint}/${request.routeBinding}`
        }
    }
}

function registerRoute(path, request) {
    let methodKey,
        argsKey;

    switch (request.method) {
        case METHOD.GET:
            methodKey = METHOD.GET.toLowerCase();
            argsKey = 'query';
            break;
        case METHOD.POST:
            methodKey = METHOD.POST.toLowerCase();
            argsKey = 'body';
            break;
        default:
            return;
    }

    router[methodKey](path, (req, res) => {
        let args = {};
        _.extend(args, req.query || {}, req.body || {}, req.params || {});

        request(args)
            .then(response => res.json(response))
            .catch(error);
    });

    var error = (error) => {
        console.log(error);
    };
}

export default router;