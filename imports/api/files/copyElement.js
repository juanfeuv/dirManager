import { Meteor } from 'meteor/meteor';
import { copySync } from 'fs-extra';

import { PWD } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const copyElement = ({ src, dest }) => {
    try {
        copySync(`${rootPath}/${src}`, `${rootPath}/${dest}`);

        return true;
    } catch (error) {
        console.error(error);

        throw new Meteor.Error(error);
    }
};

Meteor.methods({
    copyElement,
});
