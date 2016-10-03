import destiny from '../api/destiny';
import gg from '../api/gg';
import _ from 'lodash';
import express from 'express';
import {METHOD} from '../constants';

let router        = express.Router(),
    api           = {},
    apiToRegister = [
        {name: 'destiny', routes: destiny},
        {name: 'gg', routes: gg}
    ];

registerEndpoints(apiToRegister);
export default router;

function registerEndpoints(apiToRegister) {
    router.get('/reflect', (req, res) => {
        res.json(api);
    });

    apiToRegister.forEach(_api => {
        let currentApi = api[_api.name] = {};
        for (let route in _api.routes) {
            if (!_api.routes.hasOwnProperty(route)) {
                continue;
            }

            currentApi[route] = {};
            generateEndpoints(currentApi, _api.name, route, _api.routes[route]);
        }
    });
}

function generateEndpoints(api, baseRoute, route, endpoints) {
    for (var endpoint in endpoints) {
        if (!endpoints.hasOwnProperty(endpoint)) {
            continue;
        }
        let request = endpoints[endpoint],
            path;

        if (request.hasOwnProperty('routeBinding')) {
            path = `/${baseRoute}/${route}/${endpoint}/${request.routeBinding}`;
        } else {
            path = `/${baseRoute}/${route}/${endpoint}`
        }

        registerRoute(path, request);

        api[route][endpoint] = {
            method: request.method,
            requiredParameters: request.requiredParameters,
            externalPath: request.path,
            routeBinding: request.routeBinding,
            route: `~/api/${baseRoute}/${route}/${endpoint}/${request.routeBinding}`
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