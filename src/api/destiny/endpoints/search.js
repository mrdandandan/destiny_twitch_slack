import {PARAMETERS} from '../../constants';
import DestinyApiRequest from '../DestinyApiRequest';

export default {
    searchDestinyPlayer: new DestinyApiRequest({
        path: `SearchDestinyPlayer/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.DISPLAY_NAME}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.DISPLAY_NAME}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.DISPLAY_NAME
        ]
    }).buildRequest()
};