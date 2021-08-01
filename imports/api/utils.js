import path from 'path';

export const PWD = path.join(process.cwd(), '../../../../../');

export const cleanPathFormat = path => String(path)
    .replace(new RegExp('(\/{2,}|\\{1,})'), '/');

export const getFileNameFromPath = (path) => String(path)
    .replace(new RegExp('^.*[\\\/]'), '');