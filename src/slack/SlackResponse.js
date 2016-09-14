import SlackMessage from './SlackMessage';

let privateProps = new WeakMap();
export default class SlackResponse extends SlackMessage{
    constructor(slackContext, messageProps = {}) {
        super(messageProps);
        privateProps.set(this, {slackContext});
    }

    send(showRequestedBy) {
        let slackContext = privateProps.get(this).slackContext;
        return super.send(slackContext.response_url, showRequestedBy ? ` _(requested by ${slackContext.user_name})_` : '')
    }

    static errorResponse(slackContext, message) {
        return new SlackResponse(slackContext, {text: `Something went wrong: ${message}`});
    }
}