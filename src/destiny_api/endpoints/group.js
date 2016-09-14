import {PARAMETERS} from '../constants';
import buildRequest from '../utils/buildRequest';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getMembersV3: new DestinyApiRequest({
        path: 'Group/{groupId}/MembersV3',
        requiredParameters: [
            PARAMETERS.GROUP_ID
        ],
        isPlatformRequest: false
    }).buildRequest(),
    getGroupByName: new DestinyApiRequest({
        path: 'Group/Name/{name}',
        requiredParameters: [
            PARAMETERS.NAME
        ],
        isPlatformRequest: false
    }).buildRequest()
};