import { convert } from 'unix-permissions'
import { Meteor } from 'meteor/meteor';
import { chmodSync } from 'fs';

import { PWD, cleanPathFormat } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const setPermission = ({ path, permission }) => {
    const getPermissionCode = convert.octal(permission);    

    try {
        chmodSync(cleanPathFormat(`${rootPath}/${path}`), getPermissionCode);
           
        return true;
    } catch (error) {
        console.error(error);

        throw new Error(error);
    }
};

Meteor.methods({ setPermission });