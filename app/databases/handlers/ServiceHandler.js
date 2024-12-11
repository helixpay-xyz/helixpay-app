import {Platform} from 'react-native';
import CBConstant from 'constants/CBConstant';
import CBDatabase from 'databases/CBDatabase';
import CBGlobal from 'globals/CBGlobal';
import I18n from 'react-native-i18n';

const STATUS_OFF = 0;
const STATUS_ON = 1;
const STATUS_FOR_ANDROID = 2;
const STATUS_FOR_IOS = 3;
const STATUS_MAINTENANCE = 4;

export default class ServiceHandler {

    static getService(isShallow = true) {
        const db = new CBDatabase();
        const array = db.read(CBConstant.SERVICE_SCHEMA, `(status == ${STATUS_ON} OR status == ${STATUS_MAINTENANCE} OR status == ${Platform.select({android: STATUS_FOR_ANDROID, ios: STATUS_FOR_IOS})} OR user CONTAINS "${CBGlobal.userId}" OR user CONTAINS "${CBGlobal.userUsername}") AND language == "${I18n.locale}"`, [['sortOrder', false]]);
        return isShallow ? JSON.parse(JSON.stringify(array)) : array;
    }

    static getServiceByCode(code, isShallow = true) {
        const db = new CBDatabase();
        const array = db.read(CBConstant.SERVICE_SCHEMA, `code == "${code}" AND (status == ${STATUS_ON} OR status == ${STATUS_MAINTENANCE} OR status == ${Platform.select({android: STATUS_FOR_ANDROID, ios: STATUS_FOR_IOS})} OR user CONTAINS "${CBGlobal.userId}" OR user CONTAINS "${CBGlobal.userUsername}") AND language == "${I18n.locale}"`, [['sortOrder', false]]);
        return isShallow ? JSON.parse(JSON.stringify(array)) : array;
    }

    static getServiceByRefId(refId, isShallow = true) {
        const db = new CBDatabase();
        const array = db.read(CBConstant.SERVICE_SCHEMA, `refId == "${refId}" AND (status == ${STATUS_ON} OR status == ${STATUS_MAINTENANCE} OR status == ${Platform.select({android: STATUS_FOR_ANDROID, ios: STATUS_FOR_IOS})} OR user CONTAINS "${CBGlobal.userId}" OR user CONTAINS "${CBGlobal.userUsername}") AND language == "${I18n.locale}"`, [['sortOrder', false]]);
        return isShallow ? JSON.parse(JSON.stringify(array)) : array;
    }
}
