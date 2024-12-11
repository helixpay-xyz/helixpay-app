import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CBPush {

    static async pushOSToken(callback) {
        const values = await AsyncStorage.multiGet(['@os_token', '@os_token_trigger', '@app_notification']);
        const token = values && values[0] && values[0][1] ? values[0][1] : '';
        const trigger = values && values[1] && values[1][1] ? values[1][1] : '';
        const notification = values && values[2] && values[2][1] ? values[2][1] : '';
        if (token && !(trigger === 'true') && !(notification === 'false')) {
            callback && callback();
        } else {
            callback && callback();
        }
    }

    static async pushFCMToken(callback) {
        const values = await AsyncStorage.multiGet(['@fcm_token', '@fcm_token_trigger', '@app_notification']);
        const token = values && values[0] && values[0][1] ? values[0][1] : '';
        const trigger = values && values[1] && values[1][1] ? values[1][1] : '';
        const notification = values && values[2] && values[2][1] ? values[2][1] : '';
        if (token && !(trigger === 'true') && !(notification === 'false')) {
            callback && callback();
        } else {
            callback && callback();
        }
    }
}
