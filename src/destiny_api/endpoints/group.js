import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getMembersV3: new DestinyApiRequest({
        path: 'Group/{groupId}/MembersV3',
        routeBinding: ':groupId',
        requiredParameters: [
            PARAMETERS.GROUP_ID
        ],
        isPlatformRequest: false
    }).buildRequest(),
    getGroupByName: new DestinyApiRequest({
        path: 'Group/Name/{name}',
        routeBinding: ':name',
        requiredParameters: [
            PARAMETERS.NAME
        ],
        isPlatformRequest: false
    }).buildRequest()
};