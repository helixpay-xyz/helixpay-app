import {Linking, Platform} from 'react-native';
import DialogAlertHolder from '../../DialogAlertHolder';
import CBConstant from 'constants/CBConstant';
import {strings} from 'controls/i18n';

export default class CBHandler {

    static openUrl(url, callbackUrl) {
        Linking.canOpenURL(url).then((supported) => {
            if (!supported) {
                if (callbackUrl) {
                    return Linking.openURL(callbackUrl);
                } else {
                    DialogAlertHolder.alert(strings('title_alert_open_url'), strings('message_alert_open_url'));
                }
            }
            return Linking.openURL(url);
        }).catch((error) => console.error('An error occurred', error));
    }

    static openAppIntoStore() {
        if (Platform.OS === 'android') {
            Linking.openURL(CBConstant.PLAY_STORE_LINK).catch((error) => console.error('An error occurred', error));
        } else {
            Linking.openURL(CBConstant.APP_STORE_LINK).catch((error) => console.error('An error occurred', error));
        }
    }
}
