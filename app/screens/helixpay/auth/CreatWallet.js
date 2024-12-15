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

export default class CreateWallet extends Base {

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
        this.cbBottomPassword.current.show({
            title: 'Secure Your Wallet',
            message: 'Secret Recovery Phrase make your account safety. make sure you keep it safe too',
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
                        <Formik
                            initialValues={{password: '', confirmPassword: ''}}
                            validate={(values) => {
                                const errors = {};
                                const passwordError = this.validatePassword(values.password);
                                const confirmPasswordError = this.validateConfirmPassword(values.confirmPassword, values.password);
                                if (passwordError) errors.password = passwordError;
                                if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
                                return errors;
                            }}
                            validateOnChange={true}
                            validateOnBlur={false}
                            onSubmit={this.onCreateWallet}>
                            {
                                ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                                    <>
                                        <CBInput
                                            containerStyle={{marginTop: 30, marginBottom: 0}}
                                            inputContainerStyle={{borderColor: !!values.password ? theme.colors.primary : theme.colors.gray}}
                                            rightIcon={{ type: 'ionicon', name: showPassword ? 'eye-off-outline' : 'eye-outline', color: colors.white, size: 24, onPress: this.togglePasswordVisibility}}
                                            rightIconContainerStyle={{paddingRight: 10}}
                                            placeholder={strings('placeholder_password')}
                                            returnKeyType={'go'}
                                            keyboardType={showPassword ? 'default' : 'ascii-capable'}
                                            autoCapitalize={'none'}
                                            secureTextEntry={!showPassword}
                                            maxLength={64}
                                            value={values.password}
                                            // errorMessage={errors.password}
                                            onChangeText={handleChange('password')}
                                            onFocus={this.onToggleError(setFieldError, 'password')}
                                            onSubmitEditing={handleSubmit}
                                        />
                                        <CBText style={[appStyles.subtext, {marginTop: -10}]}>{'Min 8 Character with combination of letters & numbers'}</CBText>
                                        {!!values.password ? <CBView style={[appStyles.row, {justifyContent: 'space-between', marginTop: 10}]} define={'none'}>
                                            <CBView style={[appStyles.row]}>
                                                <CBView style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 1 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                                                <CBView style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 2 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                                                <CBView style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 3 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                                                <CBView style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 4 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                                            </CBView>
                                            <CBText style={[appStyles.text, {color: theme.colors.primary, fontFamily: 'SpaceGrotesk-Medium'}]}>{strongType > 2 ? 'Strong' : 'Week'}</CBText>
                                        </CBView> : null}

                                        <CBInput
                                            containerStyle={{ marginTop: 15, marginBottom: 0 }}
                                            inputContainerStyle={{
                                                borderColor: values.confirmPassword ? theme.colors.primary : theme.colors.gray,
                                            }}
                                            rightIcon={{
                                                type: 'ionicon',
                                                name: showConfirmPassword ? 'eye-off-outline' : 'eye-outline',
                                                color: colors.white,
                                                size: 24,
                                                onPress: this.toggleConfirmPasswordVisibility,
                                            }}
                                            rightIconContainerStyle={{ paddingRight: 10 }}
                                            placeholder={'Confirm your password'}
                                            returnKeyType={'go'}
                                            secureTextEntry={!showConfirmPassword}
                                            autoCapitalize={'none'}
                                            maxLength={16}
                                            value={values.confirmPassword}
                                            // errorMessage={errors.confirmPassword}
                                            onChangeText={handleChange('confirmPassword')}
                                        />
                                        <CBText style={[appStyles.subtext, { marginTop: -10 }]}>
                                            {errors.confirmPassword || 'Make sure both passwords match'}
                                        </CBText>
                                        <CBView style={{ marginTop: 'auto', marginBottom: 30 }}>
                                            <CBButton containerStyle={{ marginTop: 15 }} buttonStyle={appStyles.button} title={strings('button_password')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor },]} onPress={handleSubmit}/>
                                        </CBView>
                                    </>
                                )
                            }
                        </Formik>
                        {!!uri && <CBAction style={{alignSelf: 'center', marginTop: 30}} title={strings('action_terms_and_conditions')} onPress={this.onTermsAndConditions}/>}
                        <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 10, left: 10}]} define={'none'} onPress={this.onClose}>
                            <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>
                        </CBTouchableOpacity>
                    </CBView>
                </CBTouchableWithoutFeedback>
                <CBBottomPassword ref={this.cbBottomPassword}/>
            </CBImageBackground>
        );
    }
}
