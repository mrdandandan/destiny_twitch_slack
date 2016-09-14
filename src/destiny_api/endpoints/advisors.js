import {PARAMETERS} from '../constants';
import buildRequest from '../utils/buildRequest';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getPublicAdvisors: new DestinyApiRequest({
        path: 'Advisors',
        requiredParameters: []
    }).buildRequest(),
    getPublicXurVendor: new DestinyApiRequest({
        path: 'Advisors/Xur',
        requiredParameters: []
    }).buildRequest(),
    getSpecialEventAdvisors: new DestinyApiRequest({
        path: 'Events'
    }).buildRequest()
}