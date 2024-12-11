import {Platform} from 'react-native';
import DialogAlertHolder from '../../DialogAlertHolder';
import DropdownAlertHolder from '../../DropdownAlertHolder';
import CBLocation from 'modules/CBLocation';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {strings} from 'controls/i18n';

export default class LocationTracker {

    static showAlertLocationPermission(callback) {
        DialogAlertHolder.alert(strings('title_alert_permissions'),
            strings('message_alert_location_permission'),
            [
                {text: strings('button_close')},
                {text: strings('button_next'), onPress: callback}
            ]
        );
    }

    static async requestFusedLocation(callback) {
        const result = await check(Platform.select({
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        }));
        if (result === RESULTS.GRANTED) {
            this.getCurrentLocation((location) => {
                if (location) {
                    callback(location);
                } else {
                    CBLocation.getCurrentLocation((location) => {
                        if (location) {
                            callback(location);
                        } else {
                            this.getFuzzyLocation(callback);
                        }
                    });
                }
            });
        } else {
            this.showAlertLocationPermission(async () => {
                const result = await request(Platform.select({
                    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                }));
                if (result === RESULTS.GRANTED) {
                    this.requestFusedLocation(callback);
                } else {
                    if (result === RESULTS.BLOCKED) {
                        DropdownAlertHolder.alertWithType('warn', strings('title_alert_block_permission'), strings('message_alert_block_permission'));
                    }
                }
            });
        }
    }

    static getCurrentLocation(callback) {
        Geolocation.getCurrentPosition(
            (info) => {
                if (info && info.coords) {
                    callback(info.coords);
                } else {
                    callback(null);
                }
            },
            (error) => {
                callback(null);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    static getFuzzyLocation(callback) {
        Geolocation.getCurrentPosition(
            (info) => {
                if (info && info.coords) {
                    callback(info.coords);
                } else {
                    callback(null);
                }
            },
            (error) => {
                callback(null);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 1000
            }
        );
    }

    static startUpdatingLocation() {
        CBLocation.startUpdatingLocation();
    }

    static onLocationChange(callback) {
        return CBLocation.onLocationChange(callback);
    }

    static stopUpdatingLocation() {
        CBLocation.stopUpdatingLocation();
    }

    static watchPosition(success) {
        return Geolocation.watchPosition(success);
    }

    static clearWatch(watchID) {
        if (watchID) {
            Geolocation.clearWatch(watchID);
        }
    }
}
