import React from 'react';
import {AppState, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

import Base from 'screens/Base';

export default class Tracking extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
        this.timer = setTimeout(this.checkTrackingPermission, 300);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.appStateSubscription.remove();
        clearTimeout(this.timer);
    }

    handleAppStateChange = async (state) => {
        if (state === 'active') {
            this.checkTrackingPermission();
        }
    };

    checkTrackingPermission = async () => {
        if (Platform.OS === 'android') {
            this.onSuccessTracking();
        } else {
            const result = await check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
            if (result === RESULTS.GRANTED) {
                this.onSuccessTracking();
            } else {
                this.requestTrackingPermission();
            }
        }
    };

    requestTrackingPermission = async () => {
        const result = await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
        if (result === RESULTS.GRANTED) {
            this.onSuccessTracking();
        } else {
            this.onFailureTracking();
        }
    };

    onSuccessTracking() {

    }

    onFailureTracking() {

    }
}
