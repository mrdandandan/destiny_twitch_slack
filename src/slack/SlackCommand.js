import SlackCommandOption from './SlackCommandOption';

let privateProps = new WeakMap();
export default class SlackCommand {
    constructor() {
        privateProps.set(this, {
            commandOptions: [],
            defaultAction: function() {}
        });
    }

    command() {
        return privateProps.get(this).command;
    }

    registerCommandOption(option, action) {
        privateProps.get(this).commandOptions.push(new SlackCommandOption(option, action));
    }

    registerDefaultAction(action) {
        privateProps.get(this).defaultAction = action;
    }

    execute(slackContext) {
        let commandParts = slackContext.text.split(' '),
            baseCommand = commandParts[0],
            params = commandParts.slice(1).join(' ');

        let possibleOptions = privateProps.get(this).commandOptions;

        let option = possibleOptions.find(option => {
            return option.isOption(baseCommand);
        });

        if(!option) {
            return privateProps.get(this).defaultAction(slackContext, params);
        }

        return option.getAction()(slackContext, params);
    }
}