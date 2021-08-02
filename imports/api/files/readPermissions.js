import { convert } from 'unix-permissions'
import { Meteor } from 'meteor/meteor';
import { statSync } from 'fs';

import { PWD, cleanPathFormat } from '../utils';

const rootPath = Meteor.isDevelopment
    ? `${PWD}tmp`
    : `/tmp/`;

const readPermissions = ({ path }) => {
    try {
        const stats = statSync(cleanPathFormat(`${rootPath}/${path}`), {
            throwIfNoEntry: true,
        });
            
        const validatedPermission = convert.object(stats.mode);        
    
        return validatedPermission;
    } catch (error) {
        console.error(error);

        throw new Error(error);
    }
};

Meteor.methods({ readPermissions });