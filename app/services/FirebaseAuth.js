import DialogAlertHolder from '../../DialogAlertHolder';
import CBNative from 'modules/CBNative';
import auth from '@react-native-firebase/auth';
import {strings} from 'controls/i18n';

export default class FirebaseAuth {

    static confirmationResult = null;

    static clearOTP() {
        this.confirmationResult = null;
    }

    static sendOTP(phoneNumber, showLoading = true, showError = true, callback) {
        if (!this.confirmationResult && phoneNumber) {
            if (!__DEV__ && showLoading) CBNative.showLoading();
            auth().signInWithPhoneNumber(phoneNumber).then((confirmationResult) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                this.confirmationResult = confirmationResult;
                callback && callback(true);
            }).catch((error) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                if (showError) DialogAlertHolder.alert(strings('title_alert_request'), error?.message || strings('message_alert_request'));
                callback && callback(false);
            });
        }
    }

    static verifyOTP(code, showLoading = true, showError = true, callback) {
        if (this.confirmationResult && code) {
            if (!__DEV__ && showLoading) CBNative.showLoading();
            this.confirmationResult.confirm(code).then((user) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                this.confirmationResult = null;
                callback && callback(user);
            }).catch((error) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                if (showError) DialogAlertHolder.alert(strings('title_alert_request'), error?.message || strings('message_alert_request'));
                callback && callback(null);
            });
        }
    }

    static sendSocial(param, showLoading = true, showError = true, callback) {
        if (param) {
            const {name, accessToken, idToken, identityToken, nonce} = param;
            if (name === 'Facebook') {
                callback && callback(auth.FacebookAuthProvider.credential(accessToken));
            } else if (name === 'Google') {
                callback && callback(auth.GoogleAuthProvider.credential(idToken));
            } else if (name === 'Apple') {
                callback && callback(auth.AppleAuthProvider.credential(identityToken, nonce));
            } else {
                callback && callback(null);
            }
        }
    }

    static verifySocial(credential, showLoading = true, showError = true, callback) {
        if (credential) {
            if (!__DEV__ && showLoading) CBNative.showLoading();
            auth().signInWithCredential(credential).then((user) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                callback && callback(user);
            }).catch((error) => {
                if (!__DEV__ && showLoading) CBNative.hideLoading();
                if (showError) DialogAlertHolder.alert(strings('title_alert_request'), error?.message || strings('message_alert_request'));
                callback && callback(null);
            });
        }
    }
}
