import { Meteor } from 'meteor/meteor';
import { readdir } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const awaitReadFiles = (path) => new Promise((resolve, reject) => readdir(`${rootPath}${path}`, (err, files) => {
    if (err) {
        reject(err);

        return;
    }

    resolve(files);
}));

const readFiles = async ({ path }) => {
    const files = await awaitReadFiles(path);

    return files;
};

Meteor.methods({ readFiles });