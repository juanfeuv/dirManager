import { existsSync } from 'fs';
import { removeSync } from 'fs-extra';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const removeDir = (path) => {
    if (existsSync(path)) {
        removeSync(path);
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