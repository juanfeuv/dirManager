import { existsSync, rmdirSync } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const removeDir = (path) => {
    if (existsSync(path)) {
        rmdirSync(path, {
            recursive: true,
        });
    } else {
        console.log("Directory path not found.")
    }
}

const removeDirectory = ({ path }) => {
    try {
        removeDir(`${rootPath}/${path}`);

        return true;
    } catch (error) {
        throw new Meteor.Error('Error elimnando directorio', 'Error elimnando directorio');
    }
};

Meteor.methods({ removeDirectory });