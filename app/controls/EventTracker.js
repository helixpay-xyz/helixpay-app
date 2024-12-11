import analytics from '@react-native-firebase/analytics';
import {OneSignal} from 'react-native-onesignal';
import Analytics from 'appcenter-analytics';
import AppCenter from 'appcenter';

export default class EventTracker {

    static setUserId(id) {
        if (id) {
            analytics().setUserId(String(id));
            OneSignal.login(String(id));
            AppCenter.setUserId(String(id))
        }
    }

    static removeUserId() {
        analytics().setUserId('');
        OneSignal.logout();
        AppCenter.setUserId('');
    }

    static logEvent(event, params = {}) {
        if (event && !__DEV__) {
            analytics().logEvent(event, params);
            Analytics.trackEvent(event, params);
        }
    }
}
