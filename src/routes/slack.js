let express = require('express'),
    router  = express.Router();

import slackDirector from '../slack/commands/director';
import slackCrucible from '../slack/commands/crucible';
import slackTwitch from '../slack/commands/twitch';

function requestAck(payload) {
    return {
        type: 'ephemeral',
        title: 'Request Received',
        text: `Command: \`${payload.command} ${payload.text}\` is processing`
    };
}

router.get('/crucible', (req, res) => {
    slackCrucible.execute(req.query);
    res.json(requestAck(req.query));
});
router.get('/twitch', (req, res) => {
    slackTwitch.execute(req.query);
    res.json(requestAck(req.query));
});
router.get('/director', (req, res) => {
    slackDirector.execute(req.query);
    res.json(requestAck(req.query));
});

export default router;