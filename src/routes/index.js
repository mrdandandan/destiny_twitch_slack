import api from './api';
import slack from './slack';

export default function routes(app) {
    app.use('/api', api);
    app.use('/slack', slack);
}