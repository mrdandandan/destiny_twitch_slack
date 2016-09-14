import {APP_CONFIG} from '../constants';
let request = require('request-promise');

const SLACK_API_METHOD = {
    FILE_LIST: 'files.list',
    FILE_DELETE: 'files.delete'
};

start();

function start() {
    request(buildListRequest())
        .then(checkIfRecordsToDelete)
        .then(deleteRecords)
        .then(continueToNextPage);
}

function checkIfRecordsToDelete(response) {
    console.log(`there are ${response.paging.pages} pages with ${response.paging.total} items left to delete`)
    return response.paging && response.paging.total > 0 ? response.files : [];
}

function continueToNextPage(flag) {
    if(!flag) {
        console.log('done');
        return;
    }
    console.log('restarting');
    start();
}

function deleteRecords(files) {
    let deletePromises = [];
    files.forEach(file => {
        console.log(`Deleteing file for date ${new Date(file.timestamp * 1000)}`);
        deletePromises.push(request(buildDeleteRequest(file)));
    });

    if(!deletePromises.length) {
        return false;
    }

    return Promise.all(deletePromises)
        .then(() => {
            return true;
        });
}

function buildListRequest(page = 1) {
    let uri = `${APP_CONFIG.SLACK.API_URL}/${SLACK_API_METHOD.FILE_LIST}`;
    let toDate = new Date();
    toDate.setMonth(toDate.getMonth() - 1);

    let requestBody = {
        token: APP_CONFIG.SLACK.API_KEY,
        ts_to: toDate.getTime() / 1000,
        page
    };

    return {
        method: 'GET',
        uri: uri,
        qs: requestBody,
        json: true
    }
}

function buildDeleteRequest(file) {
    let requestBody = {
        token: APP_CONFIG.SLACK.API_KEY,
        file: file.id
    };

    return {
        method: 'GET',
        uri: `${APP_CONFIG.SLACK.API_URL}/${SLACK_API_METHOD.FILE_DELETE}`,
        qs: requestBody,
        json: true
    };
}