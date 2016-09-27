import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getMembersV3: new DestinyApiRequest({
        path: `Group/{${PARAMETERS.GROUP_ID}}/MembersV3`,
        routeBinding: `:${PARAMETERS.GROUP_ID}`,
        requiredParameters: [
            PARAMETERS.GROUP_ID
        ],
        isPlatformRequest: false
    }).buildRequest(),
    getGroupByName: new DestinyApiRequest({
        path: `Group/Name/{${PARAMETERS.NAME}}`,
        routeBinding: `:${PARAMETERS.NAME}`,
        requiredParameters: [
            PARAMETERS.NAME
        ],
        isPlatformRequest: false
    }).buildRequest()
};