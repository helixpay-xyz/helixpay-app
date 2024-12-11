import React from 'react';
import {AppState, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationTracker from 'controls/LocationTracker';
import {check, openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {strings} from 'controls/i18n';

import Base from 'screens/Base';

export default class Location extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);
        this.timer = setTimeout(this.checkLocationPermission, 300);
        LocationTracker.onLocationChange(this.onLocationChange);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.appStateSubscription.remove();
        clearTimeout(this.timer);
    }

    handleAppStateChange = async (state) => {
        if (state === 'active') {
            this.checkLocationPermission();
        }
    };

    checkLocationPermission = async () => {
        const result = await check(Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        }));
        if (result === RESULTS.GRANTED) {
            this.grantedPermission();
        } else {
            this.showAlertGrantPermission();
        }
    };

    requestLocationPermission = async () => {
        const result = await request(Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        }));
        if (result === RESULTS.GRANTED) {
            this.grantedPermission();
        } else {
            this.deniedPermission();
        }
    };

    showAlertGrantPermission = () => {
        this.alert(strings('title_alert_permissions'),
            strings('message_alert_location_permission'),
            [
                {text: strings('button_close'), onPress: this.deniedPermission},
                {text: strings('button_next'), onPress: this.requestLocationPermission}
            ]
        );
    };

    grantedPermission = () => {
        LocationTracker.requestFusedLocation(async (location) => {
            if (location) {
                this.location = location;
                await AsyncStorage.setItem('@app_lasted_location', `${location.latitude},${location.longitude}`);
                this.onSuccessLocation();
            } else {
                this.deniedGPSSetting();
                this.onFailureLocation();
            }
        });
    };

    deniedPermission = () => {
        this.onFailureLocation();
    };

    deniedGPSSetting = () => {
        this.alert(strings('title_alert_empty_location'),
            strings('message_alert_empty_location'),
            [
                {text: strings('button_close')},
                {text: strings('button_ok'), onPress: () => openSettings().catch(() => console.log('Cannot open settings.'))}
            ]
        );
    };

    onSuccessLocation() {

    }

    onFailureLocation() {

    }

    startUpdatingLocation() {
        LocationTracker.startUpdatingLocation();
    }

    onLocationChange = (location) => {
        this.location = location;
    };

    stopUpdatingLocation() {
        LocationTracker.stopUpdatingLocation();
    }
}
