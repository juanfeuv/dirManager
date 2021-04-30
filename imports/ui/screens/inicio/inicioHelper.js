import { Meteor } from 'meteor/meteor';

export const readFiles = ({ path }) => new Promise((resolve, reject) => Meteor
    .call('readFiles', { path }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const createFile = ({ path }) => new Promise((resolve, reject) => Meteor
    .call('createFile', { path }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const removeFile = ({ path }) => new Promise((resolve, reject) => Meteor
    .call('removeFile', { path }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const createDirectory = ({ path }) => new Promise((resolve, reject) => Meteor
    .call('createDirectory', { path }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const removeDirectory = ({ path }) => new Promise((resolve, reject) => Meteor
    .call('removeDirectory', { path }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const renameElement = ({ oldPath, newPath }) => new Promise((resolve, reject) => Meteor
    .call('renameElement', { oldPath, newPath }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const copyElement = ({ src, dest }) => new Promise((resolve, reject) => Meteor
    .call('copyElement', { src, dest }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));

export const moveElement = ({ src, dest }) => new Promise((resolve, reject) => Meteor
    .call('moveElement', { src, dest }, (err, res) => {
        if (err) {
            reject(err);

            return;
        }

        resolve(res);
    }));
