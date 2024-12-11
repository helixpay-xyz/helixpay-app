import React from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CBContainer} from 'components';
import CBGlobal from 'globals/CBGlobal';
import AppStore from 'stores/AppStore';
import CodePush from 'react-native-code-push';
import {LocaleConfig} from 'react-native-calendars';
import I18n from 'react-native-i18n';
import moment from 'moment';
import {strings} from 'controls/i18n';

import Base from 'screens/Base';

export default class AuthLoading extends Base {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
        this.timer = setTimeout(this.onValidation, 100);
        this.trigger = setTimeout(this.onBroken, 10000);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearTimeout(this.timer);
        clearTimeout(this.trigger);
    }

    onValidation = async () => {
        const values = await AsyncStorage.multiGet(['@user_language', '@user_token', '@user_role', '@user_id']);

        const userLanguage = values && values[0] && values[0][1] ? values[0][1] : 'vi';
        I18n.locale = userLanguage || I18n.currentLocale().split('-')[0] || 'vi';
        LocaleConfig.defaultLocale = userLanguage || 'vi';
        moment.locale(userLanguage || 'vi');

        /*const userToken = values && values[1] && values[1][1] ? values[1][1] : '';
        const userRole = values && values[2] && values[2][1] ? values[2][1] : '';
        const userId = values && values[3] && values[3][1] ? values[3][1] : '';
        if (userToken && userRole) {
            CBGlobal.userToken = userToken;
            CBGlobal.userRole = userRole;
            CBGlobal.userId = userId;
            switch (userRole) {
                case 'user':
                    AppStore.setMode('User');
                    break;
                case 'admin':
                    AppStore.setMode('Admin');
                    break;
                default:
                    AppStore.setMode('Auth');
                    break;
            }
        } else {
            AppStore.setMode('Auth');
        }*/
    };

    onRestart = () => {
        CodePush.restartApp();
    };

    onBroken = () => {
        this.alert(strings('title_alert_broken'),
            strings('message_alert_broken'),
            [{text: strings('button_restart')}],
            {onDismiss: this.onRestart}
        );
    };

    render() {
        const {theme} = this.context;
        return (
            <CBContainer style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color={theme.colors.primary}/>
            </CBContainer>
        );
    }
}
