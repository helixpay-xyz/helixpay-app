import React from 'react';
import {Keyboard} from 'react-native';
import RootNavigation from 'screens/RootNavigation';
import {CBAction, CBBottomPassword, CBButton, CBIcon, CBImageBackground, CBInput, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView,} from 'components';
import JsonUtil from 'utils/JsonUtil';
import {appStyles} from 'configs/styles';
import colors from 'configs/colors';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import {ref, set } from "firebase/database";
import {db} from 'app/firebase/config';

import {Formik} from 'formik';
import * as yup from 'yup';

import Base from 'screens/Base';
import EventTracker from 'controls/EventTracker';
import ImageUtil from "utils/ImageUtil";

export default class SeedPhrase extends Base {

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            template: null,
            isCompany: false,
            isAutoFill: false,
            showPassword: false,
            showConfirmPassword: false,
            strongType: 1
        };

        this.cbBottomPassword = React.createRef();
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    load() {
        this.setState({
            uri: this.defaultParam?.uri || '',
            template: this.defaultParam?.template || null,
            isCompany: this.defaultParam?.isCompany || false,
            isAutoFill: this.defaultParam?.isAutoFill || false
        });
    }

    validatePassword = (password) => {
        if (!password) {
            this.setState({ strongType: '' });
            return 'Password is required';
        }
        let strongType = 1;
        if (password.length >= 8) {
            this.setState({ strongType: 2 })
        }
        if (
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /\d/.test(password) &&
            /[@$!%*?&]/.test(password)
        ) {
            this.setState({ strongType: 3 })
        }

        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must include at least one uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must include at least one lowercase letter';
        }
        if (!/\d/.test(password)) {
            return 'Password must include at least one number';
        }
        if (!/[@$!%*?&]/.test(password)) {
            return 'Password must include at least one special character (e.g., @, $, !, etc.)';
        }
        return '';
    };

    validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return 'Confirm Password is required';
        }
        if (confirmPassword !== password) {
            return 'Passwords do not match';
        }
        return '';
    };

    onBlur = () => {
        Keyboard.dismiss();
    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    toggleConfirmPasswordVisibility = () => {
        this.setState((prevState) => ({ showConfirmPassword: !prevState.showConfirmPassword }));
    };

    onClose = () => {
        RootNavigation.goBack();
        EventTracker.logEvent('screen_login', {action: 'click_button_back'});
    };

    onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
    };

    onNext = async (values) => {
        await set(ref(db, 'phoneNumber/' + values?.phoneNumber), {
            phoneNumber: values?.phoneNumber,
        });
        EventTracker.logEvent('screen_login', {action: 'click_next'});
    };

    onCreateWallet = () => {
        const {strongType} = this.state;
        this.cbBottomPassword.current.show({
            title: 'Secure Your Wallet',
            message: 'Secret Recovery Phrase make your account safety. make sure you keep it safe too',
            strongType: strongType,
            onConfirm: () => {
                RootNavigation.navigate('CreateWallet');
                EventTracker.logEvent('screen_login', {action: 'click_create_wallet'});
            }
        });
    }

    onTermsAndConditions = () => {
        RootNavigation.navigate('Web', {
            title: strings('screen_terms_and_conditions'),
            defaultParam: JsonUtil.buildDefaultParam({
                uri: this.defaultParam?.uri || ''
            })
        });
        EventTracker.logEvent('screen_login', {action: 'click_terms'});
    };

    render() {
        const {theme} = this.context;
        //12345678A@f
        const {uri, strongType, showPassword, showConfirmPassword} = this.state;
        return (
            <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_1')}>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={[{flex: 1, paddingVertical: 15, paddingHorizontal: 30}, {borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar}]}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_create_password')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_password')}</CBText>
                    </CBView>
                </CBTouchableWithoutFeedback>
            </CBImageBackground>
        );
    }
}
