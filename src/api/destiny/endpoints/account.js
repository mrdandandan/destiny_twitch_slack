import {PARAMETERS} from '../../constants';
import DestinyApiRequest from '../DestinyApiRequest';

export default {
    summary: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Summary`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    summary2: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    items: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Items`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    character: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Character/{${PARAMETERS.CHARACTER_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterActivities: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Character/{${PARAMETERS.CHARACTER_ID}}/Activities`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    // Use summary instead
    characterInventory: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Character/{${PARAMETERS.CHARACTER_ID}}/Inventory`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterInventorySummary: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Character/{${PARAMETERS.CHARACTER_ID}}/Inventory/Summary`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterProgression: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Account/{${PARAMETERS.MEMBERSHIP_ID}}/Character/{${PARAMETERS.CHARACTER_ID}}/Progression`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};