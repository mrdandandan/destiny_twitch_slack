import {PARAMETERS} from '../constants';
import buildRequest from '../utils/buildRequest';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getDestinyManifest: new DestinyApiRequest({
        path: 'Manifest',
        requiredParameters: []
    }).buildRequest(),
    getActivity: new DestinyApiRequest({
        path: 'Manifest/Activity/{activityId}',
        requiredParameters: [
            PARAMETERS.ACTIVITY_ID
        ]
    }).buildRequest(),
    inventoryItem: new DestinyApiRequest({
        path: 'Manifest/InventoryItem/{inventoryItemHash}',
        requiredParameters: [
            PARAMETERS.INVENTORY_ITEM_HASH
        ]
    }).buildRequest()
};