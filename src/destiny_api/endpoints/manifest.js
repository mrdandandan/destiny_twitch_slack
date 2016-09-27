import {PARAMETERS} from '../constants';
import DestinyApiRequest from '../utils/DestinyApiRequest';

export default {
    getDestinyManifest: new DestinyApiRequest({
        path: `Manifest`,
        requiredParameters: []
    }).buildRequest(),
    getActivity: new DestinyApiRequest({
        path: `Manifest/Activity/{${PARAMETERS.ACTIVITY_ID}}`,
        routeBinding: `:${PARAMETERS.ACTIVITY_ID}`,
        requiredParameters: [
            PARAMETERS.ACTIVITY_ID
        ]
    }).buildRequest(),
    inventoryItem: new DestinyApiRequest({
        path: `Manifest/InventoryItem/{${PARAMETERS.INVENTORY_ITEM_HASH}}`,
        routeBinding: `:${PARAMETERS.INVENTORY_ITEM_HASH}`,
        requiredParameters: [
            PARAMETERS.INVENTORY_ITEM_HASH
        ]
    }).buildRequest()
};