# mr dandandan's code pile #

When cloned, run `npm i`

After installation, fill out `app.config.json`

To build, run `npm run build` for sourcemaps and `npm run build-deploy` otherwise

Entry point is `dist/server.js`


##A server with a few tricks:##

All app constants defined in `app.config.json` including API keys

* Wrap Bungie's Destiny API
Check for implemented destiny api endpoints using:
`//~/api/reflect`

Url parameters passed via queryString using `GET` (for now)

Matches parameters to their url pattern for posting to the bungie api, for example:

`//~/api/stats/activityHistory?membershipType=1&membershipId=4611686018452959881&characterId=2305843009339740073&mode=AllPvP`

will request: 

`http://www.bungie.net/Platform/Destiny/Stats/ActivityHistory/1/4611686018452959881/2305843009339740073?mode=AllPvP`

* Wrap Twitch's API

Not much here, and only used internally to query for online streams defined in `twitch.config.json`

* Implement slack integrations for Destiny/Twitch

_Due to laziness all slack requests currently hard reference membershipType:1_
