import { Meteor } from 'meteor/meteor';
import { moveSync } from 'fs-extra';

import { PWD, cleanPathFormat } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const moveElement = ({ src, dest }) => {
    console.log(cleanPathFormat(`${rootPath}/${src}`), cleanPathFormat(`${rootPath}/${dest}`));
    try {
        moveSync(cleanPathFormat(`${rootPath}/${src}`), cleanPathFormat(`${rootPath}/${dest}`));

        return true;
    } catch (error) {
        console.error(error);

        throw new Meteor.Error(error);
    }
};

Meteor.methods({
    moveElement,
});
