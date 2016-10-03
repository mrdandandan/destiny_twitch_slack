import ApiRequest from '../ApiRequest';
import {APP_CONFIG, METHOD} from '../../constants';
import DestinyApiResponse from './DestinyApiResponse';
import url from 'url';

export default class DestinyApiRequest extends ApiRequest {
    constructor({isPlatformRequest = true, path, routeBinding, requiredParameters = [], method = METHOD.GET}) {
        super({
            path,
            routeBinding,
            requiredParameters,
            method
        });

        let baseUrl = APP_CONFIG.BUNGIE.API_URL;
        if (isPlatformRequest) {
            baseUrl = url.resolve(baseUrl, APP_CONFIG.BUNGIE.API_PLATFORM);
        }
        // Cheesy hack because wtf node
        if (baseUrl[baseUrl.length - 1] !== '/') {
            baseUrl += '/';
        }

        this.setBaseUrl(baseUrl);
        this.addHeader('X-API-Key', APP_CONFIG.BUNGIE.API_KEY);
        this.addHeader('Accept', 'application/json');
        this.addHeader('Content-Type', 'application/json');
    }

    buildRequest() {
        let request = super.buildRequest();
        let destinyApiRequest = function destinyApiRequest() {
            return request(...arguments)
                .then(DestinyApiResponse.unwrap)
                .catch(DestinyApiResponse.error);
        };
        return this.appendRequestMetadata(destinyApiRequest);
    }
}