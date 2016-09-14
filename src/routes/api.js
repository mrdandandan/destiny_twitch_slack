import destiny_api from '../destiny_api';
import {METHOD} from '../constants';

var express = require('express'),
    url = require('url'),
    router = express.Router(),
    api = {};

for(var route in destiny_api) {
    if(!destiny_api.hasOwnProperty(route)) {
        continue;
    }
    api[route] = {};
    generateEndpoints(route, destiny_api[route]);
}

router.get('/reflect', (req, res) => {
    res.json(api);
});

function generateEndpoints(route, endpoints) {
    for(var endpoint in endpoints) {
        if(!endpoints.hasOwnProperty(endpoint)) {
            continue;
        }
        var path = url.resolve('/' + route + '/', endpoint),
            request = endpoints[endpoint];

        addEndpoint(path, request);
        api[route][endpoint] = {
            method: request.method,
            requiredParameters: request.requiredParameters,
            path: request.path
        }
    }
}

function addEndpoint(path, request) {
    switch(request.method) {
        case METHOD.GET:
            router.get(path, (req, res) => {
                request(req.query)
                    .then((response) => {
                        res.json(response);
                    })
                    .catch(error);
            });
            break;
        case METHOD.POST:
            router.post(path, (req, res) => {
                request(req.body)
                    .then((response) => {
                        res.json(response);
                    })
                    .catch(error);
            });
            break;
        default:
            return;
    }

    var error = (error) => {
        console.log(error);
    };
}

export default router;