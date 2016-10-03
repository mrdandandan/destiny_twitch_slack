import ApiRequest from '../ApiRequest';
import {APP_CONFIG, METHOD} from '../../constants';

export default class GGApiRequest extends ApiRequest {
    constructor({path, routeBinding, requiredParameters = [], method = METHOD.GET}) {
        super({
            path,
            routeBinding,
            requiredParameters,
            method
        });

        let baseUrl = APP_CONFIG.GG.API_URL;

        this.setBaseUrl(baseUrl);
    }
}