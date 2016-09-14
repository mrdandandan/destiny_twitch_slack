import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    account: new DestinyApiRequest({
        path: 'Stats/Account/{membershipType}/{membershipId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    activityHistory: new DestinyApiRequest({
        path: 'Stats/ActivityHistory/{membershipType}/{membershipId}/{characterId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID,
            PARAMETERS.MODE
        ]
    }).buildRequest(),
    aggregateActivityStats: new DestinyApiRequest({
        path: 'Stats/AggregateActivityStats/{membershipType}/{membershipId}/{characterId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    all: new DestinyApiRequest({
        path: 'Stats/{membershipType}/{membershipId}/{characterId}',
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
    postGameCarnageReport: new DestinyApiRequest({
        path: 'Stats/PostGameCarnageReport/{activityId}',
        requiredParameters: [
            PARAMETERS.ACTIVITY_ID
        ]
    }).buildRequest(),
    uniqueWeapons: new DestinyApiRequest({
        path: 'Stats/UniqueWeapons/{membershipType}/{membershipId}/{characterId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};