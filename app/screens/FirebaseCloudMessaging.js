import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

import Base from 'screens/Base';

export default class FirebaseCloudMessaging extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.checkPermission();
        this.onTokenRefresh();
    }

    async checkPermission() {
        const authorizationStatus = await messaging().hasPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async requestPermission() {
        const authorizationStatus = await messaging().requestPermission();
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            this.getToken();
        } else {
            this.onFailureToken();
        }
    }

    async getToken() {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            await AsyncStorage.setItem('@fcm_token', fcmToken);
            this.onSuccessToken();
        }
    }

    async onTokenRefresh() {
        this.onTokenRefreshListener = messaging().onTokenRefresh(async (fcmToken) => {
            if (fcmToken) {
                await AsyncStorage.multiSet([['@fcm_token', fcmToken], ['@fcm_token_trigger', '']]);
                this.onSuccessToken();
            }
        });
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this.onTokenRefreshListener();
    }

    onSuccessToken() {

    }

    onFailureToken() {

    }

    render() {
        return null;
    }
}
