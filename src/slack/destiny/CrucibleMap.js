import Enumeration from '../../utilities/enumeration';
export default class CrucibleMap {
    constructor(name, groupings = []) {
        this.name = name;
        this.groupings = groupings;
    }
}

CrucibleMap.grouping = new Enumeration({
    THREE: '3v3',
    FOUR: '4v4',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    VANILLA: 'vanilla',
    HOUSE_OF_WOLVES: 'how',
    DARK_BELOW: 'dark',
    TAKEN_KING: 'ttk',
    RISE_OF_IRON: 'roi',
    EARTH: 'earth',
    MOON: 'moon',
    MARS: 'mars',
    VENUS: 'venus',
    MERCURY: 'mercury',
    REEF: 'reef',
    DREADNAUGHT: 'dreadnaught',
    TRIALS: 'trials'
});