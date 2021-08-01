import { Meteor } from 'meteor/meteor';
import { copySync } from 'fs-extra';

import { PWD, cleanPathFormat, getFileNameFromPath } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const copyElement = ({ src, dest }) => {
    try {
        const parsedFrom = cleanPathFormat(`${rootPath}/${src}`);
        const parseDest = cleanPathFormat(`${rootPath}/${dest}/${getFileNameFromPath(src)}`);

        copySync(parsedFrom, parseDest, {
            overwrite: true,
            recursive: true,
        });

        return true;
    } catch (error) {
        console.error(error);

        throw new Meteor.Error(error);
    }
};

Meteor.methods({
    copyElement,
});
