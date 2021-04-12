import { Meteor } from 'meteor/meteor';
import { unlink } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const awaitRemoveFile = (path) => new Promise((resolve, reject) => unlink(`${rootPath}/${path}`, (err) => {
    if (err) {
        reject(err);

        return;
    }

    resolve(true);
}));

const removeFile = async ({ path }) => {
    const reponse = await awaitRemoveFile(path);

    return reponse;
};

Meteor.methods({ removeFile });