export default class Enumeration {
    constructor(obj) {
        for(var key in obj) {
            if(!obj.hasOwnProperty(key)) {
                continue;
            }
            this[key] = obj[key];
        }
    }

    isInstance(value) {
        for(var key in this) {
            if(!this.hasOwnProperty(key)) {
                continue;
            }
            if(value == this[key]) {
                return true;
            }
        }
        return false;
    }

    toString(value) {
        for(var key in this) {
            if(!this.hasOwnProperty(key)) {
                continue;
            }
            if(value == this[key]) {
                return key;
            }
        }
        return undefined;
    }
}