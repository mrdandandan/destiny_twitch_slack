class Activity {
    constructor({activityName, activityDescription, icon, skulls}, {tiers}) {
        this.name = activityName;
        this.description = activityDescription;
        this.icon = icon;

        if(tiers && tiers.length && skulls) {
            this.skulls = tiers[0].skullIndexes.map(skullIndex => {
                return skulls[skullIndex];
            });
        }
    }
}

export default {
    Activity
}