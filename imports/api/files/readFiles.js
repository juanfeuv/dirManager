import { Meteor } from 'meteor/meteor';
import { readdirSync } from 'fs';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const readDataDirectories = (path) => readdirSync(`${rootPath}${path}`, { withFileTypes: true });

const readFiles = ({ path }) => {
    const data = readDataDirectories(path)
        .map(file => ({
            name: file.name,
            isDirectory: file.isDirectory(),
        }));

    return data;
};

Meteor.methods({ readFiles });