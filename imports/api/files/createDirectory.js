import { Meteor } from 'meteor/meteor';
import { mkdir, existsSync } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;


const awaitCreateDirectory = (path) => new Promise((resolve, reject) => mkdir(`${rootPath}/${path}`, (err) => {
    if (err) {
        reject(err);

        return;
    }

    resolve(true);
}));

const createDirectory = async ({ path }) => {
    if (existsSync(path)) {
        return true;
    }

    const response = await awaitCreateDirectory(path);

    return response;
};

Meteor.methods({ createDirectory });