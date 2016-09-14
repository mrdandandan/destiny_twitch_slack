let privateProps = new WeakMap();
export default class SlackCommandOption {
    constructor(option, action) {
        privateProps.set(this, {
            options: option instanceof Array ? option : [option],
            action: typeof(action) === 'function' ? action : function() {}
        });
    }

    isOption(option) {
        let options = privateProps.get(this).options;
        return options.some((o) => {
            return option.toLowerCase().trim() === o.toLowerCase().trim();
        });
    }

    getAction() {
        return privateProps.get(this).action;
    }
}