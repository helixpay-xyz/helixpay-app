import React from 'react';
import {Keyboard, Platform} from 'react-native';
import RootNavigation from 'screens/RootNavigation';
import auth from '@react-native-firebase/auth';
import {
    CBAction,
    CBButton,
    CBIcon, CBImageBackground,
    CBInput,
    CBText,
    CBTouchableOpacity,
    CBTouchableWithoutFeedback,
    CBView,
} from 'components';
import CBConstant from 'constants/CBConstant';
import CBGlobal from 'globals/CBGlobal';
import PhoneNumberUtil from 'utils/PhoneNumberUtil';
import JsonUtil from 'utils/JsonUtil';
import {getHash} from 'react-native-otp-verify';
import I18n from 'react-native-i18n';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import { getDatabase, ref, set } from "firebase/database";
import {db} from 'app/firebase/config';

import {Formik} from 'formik';
import * as yup from 'yup';

import Base from 'screens/Base';
import EventTracker from 'controls/EventTracker';
import ImageUtil from "utils/ImageUtil";

export default class CreateWallet extends Base {

    validationSchema = yup.object({
        password: __DEV__ ? yup.string().trim()
            .required(strings('error_valid_password')) : yup.string().trim()
            // .matches(CBConstant.PHONE_NUMBER_REGEX_PATTERN, strings('error_valid_password'))
            .required(strings('error_valid_password'))
    });

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            template: null,
            isCompany: false,
            isAutoFill: false
        };
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

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
        EventTracker.logEvent('screen_login', {action: 'click_button_back'});
    };

    onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
    };

    // submit(param) {
    //     const user = new VXRUser();
    //     user.sendOtp(param).then(({status, data}) => {
    //         if (status === CBConstant.STATUS_OK) {
    //             RootNavigation.navigate('Verify', {
    //                 defaultParam: JsonUtil.buildDefaultParam({
    //                     param: param
    //                 })
    //             });
    //         } else {
    //             this.alert(strings('title_alert_request'), data?.title || data?.message || strings('message_alert_request'));
    //         }
    //     }).catch((error) => {
    //         console.log('error -> ' + JSON.stringify(error));
    //     });
    // }
    onNext = async (values) => {
        await set(ref(db, 'phoneNumber/' + values?.phoneNumber), {
            phoneNumber: values?.phoneNumber,
        });
        // const confirmation = await auth().signInWithPhoneNumber(values.phoneNumber);
        // console.log(`mienpv :: ${JSON.stringify(confirmation)}`);
        // const {template, isCompany, isAutoFill} = this.state;
        // const hash = await getHash();
        // const pattern = template ? template[I18n.locale] : CBConstant.OTP_PATTERN[I18n.locale];
        // this.submit({
        //     template: isAutoFill ? Platform.select({android: `${pattern} ${hash}`, ios: `${pattern} Code: $OTP`}) : pattern,
        //     lang: CBConstant.LANGUAGES[I18n.locale],
        //     ...isCompany ? {
        //         from: CBGlobal.companyId
        //     } : null,
        //     phone: PhoneNumberUtil.insertCountryCode(values.countryCode, values.phoneNumber)
        // });
        // firebase
        //     .auth()
        //     .signInWithPhoneNumber(values.phoneNumber)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         const data = {
        //             id: uid,
        //             phoneNumber: values.phoneNumber
        //         };
        //         const usersRef = firebase.firestore().collection('users')
        //         usersRef
        //             .doc(uid)
        //             .set(data)
        //             .then(() => {
        //                 RootNavigation.navigate('Home', {user: data})
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             });
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     });
        EventTracker.logEvent('screen_login', {action: 'click_next'});
    };

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
        const {uri} = this.state;
        return (
            <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_1')}>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={[{flex: 1, paddingVertical: 15, paddingHorizontal: 30}, {borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar}]}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_create_password')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_password')}</CBText>
                        <Formik
                            initialValues={{password: ''}}
                            validationSchema={this.validationSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={this.onNext}>
                            {
                                ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                                    <>
                                        <CBInput
                                            containerStyle={{marginTop: 30}}
                                            placeholder={strings('placeholder_phone_number')}
                                            returnKeyType={'go'}
                                            keyboardType={'phone-pad'}
                                            autoCapitalize={'none'}
                                            maxLength={16}
                                            value={values.phoneNumber}
                                            errorMessage={errors.phoneNumber}
                                            onChangeText={handleChange('phoneNumber')}
                                            onFocus={this.onToggleError(setFieldError, 'phoneNumber')}
                                            onSubmitEditing={handleSubmit}
                                        />
                                        <CBButton containerStyle={{marginTop: 15}} buttonStyle={appStyles.button} title={strings('button_next')} onPress={handleSubmit}/>
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
            </CBImageBackground>
        );
    }
}
