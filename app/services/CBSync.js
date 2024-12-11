import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import CBConstant from 'constants/CBConstant';
import CBConverter from 'databases/CBConverter';
import CBDatabase from 'databases/CBDatabase';
import CBGlobal from 'globals/CBGlobal';
import Parse from 'parse/react-native.js';

export default class CBSync {

    static syncService(callback) {
        const query = new Parse.Query('Service');
        query.find().then(queryResult => {
            const db = new CBDatabase();
            db.create(CBConstant.SERVICE_SCHEMA, CBConverter.convertService(queryResult), (result) => {
                if (result) {
                    DeviceEventEmitter.emit('SYNC_SERVICE');
                }
            });
        }).catch((error) => {
            console.log('error -> ' + JSON.stringify(error));
        }).finally(() => {
            callback && callback();
        });
    }

    static syncProfile(callback) {
        callback && callback();
    }

    static syncNotification(callback) {
        callback && callback();
    }

    static syncUnreadNotification(callback) {
        callback && callback();
    }

    static syncOSNotification(callback) {
        callback && callback();
    }

    static syncComplete(callback) {
        CBGlobal.appComplete = true;
        DeviceEventEmitter.emit('SYNC_COMPLETE');
        callback && callback();
    }
}
