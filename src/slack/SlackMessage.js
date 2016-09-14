import {_extend as extend} from 'util';
let request = require('request-promise');

let privateProps = new WeakMap();
export default class SlackMessage {
    constructor({
        attachments = [],
        text = '',
        type = 'ephemeral'
    }) {
        privateProps.set(this, {
            attachments,
            text,
            response_type: type
        });
    }

    addAttachment(attachment) {
        privateProps.get(this).attachments.push(attachment);
    }

    setType(type) {
        this.set('response_type', type);
    }

    setText(text) {
        this.set('text', text);
    }

    set(key, value) {
        privateProps.get(this)[key] = value;
    }

    send(uri, messageAdditional = '') {
        let body = extend({}, privateProps.get(this));
        body.text = body.text + (messageAdditional.length ? messageAdditional : '');

        if(!uri) {
            return;
        }
        
        return request({
            method: 'POST',
            uri,
            body,
            json: true
        });
    }

    toJson() {
        return JSON.stringify(privateProps.get(this));
    }

    toObject() {
        return JSON.parse(this.toJson());
    }
}