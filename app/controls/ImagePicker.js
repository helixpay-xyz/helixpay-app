import {Platform} from 'react-native';
import DialogAlertHolder from '../../DialogAlertHolder';
import DropdownAlertHolder from '../../DropdownAlertHolder';
import {check, checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {strings} from 'controls/i18n';

export default class ImagePicker {

    static showAlertGalleryPermission(callback) {
        DialogAlertHolder.alert(strings('title_alert_permissions'),
            strings('message_alert_gallery_permission'),
            [
                {text: strings('button_close')},
                {text: strings('button_next'), onPress: callback}
            ]
        );
    }

    static async fromGallery(options, callback) {
        const PERMISSION_ANDROID = Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        const PERMISSION_IOS = PERMISSIONS.IOS.PHOTO_LIBRARY;
        const result = await check(Platform.select({
            android: PERMISSION_ANDROID,
            ios: PERMISSION_IOS
        }));
        if (result === RESULTS.GRANTED || (Platform.OS === 'ios' && result === RESULTS.LIMITED)) {
            launchImageLibrary({includeBase64: true, ...options}, (response) => {
                if (response) {
                    callback(response);
                } else {
                    callback(null);
                }
            });
        } else {
            this.showAlertGalleryPermission(async () => {
                const result = await request(Platform.select({
                    android: PERMISSION_ANDROID,
                    ios: PERMISSION_IOS
                }));
                if (result === RESULTS.GRANTED || (Platform.OS === 'ios' && result === RESULTS.LIMITED)) {
                    this.fromGallery(options, callback);
                } else {
                    if (result === RESULTS.BLOCKED) {
                        DropdownAlertHolder.alertWithType('warn', strings('title_alert_block_permission'), strings('message_alert_block_permission'));
                    }
                }
            });
        }
    }

    static showAlertCameraPermission(callback) {
        DialogAlertHolder.alert(strings('title_alert_permissions'),
            strings('message_alert_camera_permission'),
            [
                {text: strings('button_close')},
                {text: strings('button_next'), onPress: callback}
            ]
        );
    }

    static async fromCamera(options, callback) {
        if (Platform.OS === 'android') {
            const PERMISSION_CAMERA = PERMISSIONS.ANDROID.CAMERA;
            const PERMISSION_STORAGE = Platform.Version >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
            const results = await checkMultiple([PERMISSION_CAMERA, PERMISSION_STORAGE]);
            if (results[PERMISSION_CAMERA] === RESULTS.GRANTED && results[PERMISSION_STORAGE] === RESULTS.GRANTED) {
                launchCamera({includeBase64: true, ...options}, (response) => {
                    if (response) {
                        callback(response);
                    } else {
                        callback(null);
                    }
                });
            } else {
                this.showAlertCameraPermission(async () => {
                    const results = await requestMultiple([PERMISSION_CAMERA, PERMISSION_STORAGE]);
                    if (results[PERMISSION_CAMERA] === RESULTS.GRANTED && results[PERMISSION_STORAGE] === RESULTS.GRANTED) {
                        this.fromCamera(options, callback);
                    } else {
                        if (results[PERMISSION_CAMERA] === RESULTS.BLOCKED || results[PERMISSION_STORAGE] === RESULTS.BLOCKED) {
                            DropdownAlertHolder.alertWithType('warn', strings('title_alert_block_permission'), strings('message_alert_block_permission'));
                        }
                    }
                });
            }
        } else {
            const result = await check(PERMISSIONS.IOS.CAMERA);
            if (result === RESULTS.GRANTED) {
                launchCamera({includeBase64: true, ...options}, (response) => {
                    if (response) {
                        callback(response);
                    } else {
                        callback(null);
                    }
                });
            } else {
                this.showAlertCameraPermission(async () => {
                    const result = await request(PERMISSIONS.IOS.CAMERA);
                    if (result === RESULTS.GRANTED) {
                        this.fromCamera(options, callback);
                    } else {
                        if (result === RESULTS.BLOCKED) {
                            DropdownAlertHolder.alertWithType('warn', strings('title_alert_block_permission'), strings('message_alert_block_permission'));
                        }
                    }
                });
            }
        }
    }
}
