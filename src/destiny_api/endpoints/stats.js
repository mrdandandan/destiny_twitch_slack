import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    account: new DestinyApiRequest({
        path: 'Stats/Account/{membershipType}/{membershipId}',
        routeBinding: ':membershipType/:membershipId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    activityHistory: new DestinyApiRequest({
        path: 'Stats/ActivityHistory/{membershipType}/{membershipId}/{characterId}',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID,
            PARAMETERS.MODE
        ]
    }).buildRequest(),
    aggregateActivityStats: new DestinyApiRequest({
        path: 'Stats/AggregateActivityStats/{membershipType}/{membershipId}/{characterId}',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    all: new DestinyApiRequest({
        path: 'Stats/{membershipType}/{membershipId}/{characterId}',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    definition: new DestinyApiRequest({
        path: 'Stats/Definition',
        requiredParameters: []
    }).buildRequest(),
    getMembershipByDisplayName: new DestinyApiRequest({
        path: '{membershipType}/Stats/GetMembershipIdByDisplayName/{displayName}',
        routeBinding: ':membershipType/:displayName',
        required: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.DISPLAY_NAME
        ]
    }).buildRequest(),
    postGameCarnageReport: new DestinyApiRequest({
        path: 'Stats/PostGameCarnageReport/{activityId}',
        routeBinding: ':activityId',
        requiredParameters: [
            PARAMETERS.ACTIVITY_ID
        ]
    }).buildRequest(),
    uniqueWeapons: new DestinyApiRequest({
        path: 'Stats/UniqueWeapons/{membershipType}/{membershipId}/{characterId}',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};