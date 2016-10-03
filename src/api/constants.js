import Enumeration from '../utilities/enumeration';

const ACTIVITY_MODE = new Enumeration({
    None: 0,
    Story: 2,
    Strike: 3,
    Raid: 4,
    AllPvP: 5,
    Patrol: 6,
    AllPvE: 7,
    PvPIntroduction: 8,
    ThreeVsThree: 9,
    Control: 10,
    Lockdown: 11,
    Team: 12,
    FreeForAll: 13,
    TrialsOfOsiris: 14,
    Doubles: 15,
    Nightfall: 16,
    Heroic: 17,
    AllStrikes: 18,
    IronBanner: 19,
    AllArena: 20,
    Arena: 21,
    ArenaChallenge: 22,
    Elimination: 23,
    Rift: 24,
    AllMayhem: 25,
    MayhemClash: 26,
    MayhemRumble: 27,
    ZoneControl: 28,
    Racing: 29,
    Supremacy: 31,
    PrivateMatchesAll: 32
});

const CLASS_HASH = new Enumeration({
    Hunter: 671679327,
    Titan: 3655393761,
    Warlock: 2271682572
});

const RACE_HASH = new Enumeration({
    Awoken: 2803282938,
    Exo: 898834093,
    Human: 3887404748
});

const GENDER_HASH = new Enumeration({
    Male: 3111576190,
    Female: 2204441813
});

const PLATFORM = {
    LIVE: 1,
    PSN: 2
};

const PARAMETERS = {
    ACTIVITY_ID: 'activityId',
    CHARACTER_ID: 'characterId',
    DISPLAY_NAME: 'displayName',
    GROUP_ID: 'groupId',
    INVENTORY_ITEM_HASH: 'inventoryItemHash',
    MEMBERSHIP_ID: 'membershipId',
    MEMBERSHIP_TYPE: 'membershipType',
    MODE: 'mode',
    NAME: 'name',
    START: 'start'
};

export {
    ACTIVITY_MODE,
    CLASS_HASH,
    RACE_HASH,
    GENDER_HASH,
    PLATFORM,
    PARAMETERS,
}