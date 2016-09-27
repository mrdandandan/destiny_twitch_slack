import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    summary: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Summary',
        routeBinding: ':membershipType/:membershipId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    summary2: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}',
        routeBinding: ':membershipType/:membershipId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    items: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Items',
        routeBinding: ':membershipType/:membershipId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    character: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterActivities: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Activities',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    // Use summary instead
    characterInventory: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Inventory',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterInventorySummary: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Inventory/Summary',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterProgression: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Progression',
        routeBinding: ':membershipType/:membershipId/:characterId',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};