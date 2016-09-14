import SlackResponse from '../SlackResponse';

export default function invalidCommand(slackContext) {
    let response = SlackResponse.errorResponse(slackContext, 'Invalid command');
    response.send();
}