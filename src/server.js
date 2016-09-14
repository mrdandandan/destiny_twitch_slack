import routes from './routes';

let APP_CONFIG = require('./app.config.json');
let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('express-cors'),
    app = express(),
    port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
    allowedOrigins: APP_CONFIG.SERVER.ALLOWED_ORIGINS
}));

routes(app);

app.listen(port);

console.log('listening on port: ' + port);