import { Meteor } from 'meteor/meteor';
import { moveSync } from 'fs-extra';

import { PWD, cleanPathFormat, getFileNameFromPath } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const moveElement = ({ src, dest }) => {
    const destTransformed = cleanPathFormat(`${rootPath}/${dest}/${getFileNameFromPath(src)}`);

    try {
        moveSync(cleanPathFormat(`${rootPath}/${src}`), destTransformed, {
            overwrite: true,
        });

        return true;
    } catch (error) {
        console.error(error);

        throw new Meteor.Error(error);
    }
};

Meteor.methods({
    moveElement,
});
