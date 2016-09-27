import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    searchDestinyPlayer: new DestinyApiRequest({
        path: 'SearchDestinyPlayer/{membershipType}/{displayName}',
        routeBinding: ':membershipType/:displayName',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.DISPLAY_NAME
        ]
    }).buildRequest()
};