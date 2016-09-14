import {PARAMETERS} from '../constants';
import buildRequest from '../utils/buildRequest';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    summary: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Summary',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    summary2: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    items: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Items',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID
        ]
    }).buildRequest(),
    character: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterActivities: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Activities',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    // Use summary instead
    characterInventory: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Inventory',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterInventorySummary: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Inventory/Summary',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest(),
    characterProgression: new DestinyApiRequest({
        path: '{membershipType}/Account/{membershipId}/Character/{characterId}/Progression',
        requiredParameters: [
            PARAMETERS.MEMBERSHIP_TYPE,
            PARAMETERS.MEMBERSHIP_ID,
            PARAMETERS.CHARACTER_ID
        ]
    }).buildRequest()
};