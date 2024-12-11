import CBConstant from 'constants/CBConstant';
import CBDatabase from 'databases/CBDatabase';

export default class NotificationHandler {

    static getNotification(isShallow = true) {
        const db = new CBDatabase();
        const array = db.read(CBConstant.NOTIFICATION_SCHEMA, '', [['timestamp', true]]);
        return isShallow ? JSON.parse(JSON.stringify(array)) : array;
    }
}
