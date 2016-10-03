import {PARAMETERS} from '../../constants';
import DestinyApiRequest from '../DestinyApiRequest';

export default {
    getPublicAdvisors: new DestinyApiRequest({
        path: `Advisors`,
        requiredParameters: []
    }).buildRequest(),
    getPublicXurVendor: new DestinyApiRequest({
        path: `Advisors/Xur`,
        requiredParameters: []
    }).buildRequest(),
    getSpecialEventAdvisors: new DestinyApiRequest({
        path: `Events`
    }).buildRequest()
}