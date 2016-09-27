import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    account: new DestinyApiRequest({
        path: `Stats/Account/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.MEMBERSHIP_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    activityHistory: new DestinyApiRequest({
        path: `Stats/ActivityHistory/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.MEMBERSHIP_ID}}/{${PARAMETERS.CHARACTER_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID,
            PARAMETERS.MODE
        ]
    }).buildRequest(),
    aggregateActivityStats: new DestinyApiRequest({
        path: `Stats/AggregateActivityStats/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.MEMBERSHIP_ID}}/{${PARAMETERS.CHARACTER_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    all: new DestinyApiRequest({
        path: `Stats/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.MEMBERSHIP_ID}}/{${PARAMETERS.CHARACTER_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    definition: new DestinyApiRequest({
        path: `Stats/Definition`,
        requiredParameters: []
    }).buildRequest(),
    getMembershipByDisplayName: new DestinyApiRequest({
        path: `{${PARAMETERS.MEMBERSHIP_TYPE}}/Stats/GetMembershipIdByDisplayName/{${PARAMETERS.DISPLAY_NAME}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.DISPLAY_NAME}`,
        required: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.DISPLAY_NAME
        ]
    }).buildRequest(),
    postGameCarnageReport: new DestinyApiRequest({
        path: `Stats/PostGameCarnageReport/{activityId}`,
        routeBinding: `:activityId`,
        requiredParameters: [
            PARAMETERS.ACTIVITY_ID
        ]
    }).buildRequest(),
    uniqueWeapons: new DestinyApiRequest({
        path: `Stats/UniqueWeapons/{${PARAMETERS.MEMBERSHIP_TYPE}}/{${PARAMETERS.MEMBERSHIP_ID}}/{${PARAMETERS.CHARACTER_ID}}`,
        routeBinding: `:${PARAMETERS.MEMBERSHIP_TYPE}/:${PARAMETERS.MEMBERSHIP_ID}/:${PARAMETERS.CHARACTER_ID}`,
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};