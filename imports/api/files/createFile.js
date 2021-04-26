import { Meteor } from 'meteor/meteor';
import { appendFile } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;


const awaitCreateFile = (path) => new Promise((resolve, reject) => appendFile(`${rootPath}/${path}`, '', (err) => {
    if (err) {
        reject(err);

        return;
    }

    resolve(true);
}));

const createFile = async ({ path }) => {
    const response = await awaitCreateFile(path);

    return response;
};

Meteor.methods({ createFile });