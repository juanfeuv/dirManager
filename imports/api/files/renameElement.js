import { Meteor } from 'meteor/meteor';

import { renameSync } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const renameElementMethod = (oldPath, newPath) => renameSync(oldPath, newPath);

const renameElement = ({ oldPath, newPath }) => {
    renameElementMethod(`${rootPath}/${oldPath}`, `${rootPath}/${newPath}`);

    return true;
};

Meteor.methods({ renameElement });
