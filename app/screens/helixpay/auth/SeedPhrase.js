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
import { generateMnemonic, validateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

import {Formik} from 'formik';
import * as yup from 'yup';

import Base from 'screens/Base';
import EventTracker from 'controls/EventTracker';
import ImageUtil from "utils/ImageUtil";
import Toast from "react-native-simple-toast";

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
            mnemonic: '',
            isValid: null
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

    handleGenerateMnemonic = () => {
        const generatedMnemonic = generateMnemonic(wordlist);
        this.setState({
            mnemonic: generatedMnemonic,
            isValid: null
        })

    };

    handleValidateMnemonic = () => {
        const {mnemonic} = this.state;
        if (!mnemonic) {
            this.alert('No Mnemonic to Validate');
            return;
        }
        const validationStatus = validateMnemonic(mnemonic, wordlist);
        this.setState({
            isValid: validationStatus
        })
        this.alert(validationStatus ? 'Mnemonic is Valid' : 'Mnemonic is Invalid');
    };

    handleCopyToClipboard = () => {
        const {mnemonic} = this.state
        if (!mnemonic) {
            Toast.show({
                type: 'error',
                text1: 'No Mnemonic to Copy',
            });
            return;
        }

        Clipboard.setString(mnemonic);
        Toast.show({
            type: 'success',
            text1: 'Mnemonic Copied to Clipboard',
        });
    };

    onBlur = () => {
        Keyboard.dismiss();
    };

    onClose = () => {
        RootNavigation.goBack();
        EventTracker.logEvent('screen_login', {action: 'click_button_back'});
    };

    onNext = async (values) => {
        await set(ref(db, 'phoneNumber/' + values?.phoneNumber), {
            phoneNumber: values?.phoneNumber,
        });
        EventTracker.logEvent('screen_login', {action: 'click_next'});
    };

    render() {
        const {theme} = this.context;
        const {mnemonic, isValid} = this.state;
        //12345678A@f
        return (
            <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_1')}>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={[{flex: 1, paddingVertical: 15, paddingHorizontal: 15}, {borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar}]}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_secret_recovery_word')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_srw')}</CBText>
                        <CBView style={[appStyles.row, {marginTop: 20}]} define={'none'}>
                            <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 5, padding: 5}]} define={'none'} onPress={this.handleGenerateMnemonic}>
                                <CBText style={[appStyles.text, {color: colors.primaryColor}]} define={'text'}>{strings('button_generate')}</CBText>
                            </CBTouchableOpacity>
                            <CBTouchableOpacity style={[appStyles.action, {backgroundColor: colors.backgroundColor, borderRadius: 5, padding: 5, marginLeft: 10}]} define={'none'} onPress={this.handleValidateMnemonic}>
                                <CBText style={[appStyles.text, {color: colors.primaryColor}]} define={'text'}>{strings('button_validate')}</CBText>
                            </CBTouchableOpacity>
                        </CBView>
                        <CBView>
                            <CBText>{mnemonic}</CBText>
                        </CBView>
                        <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 10, left: 10}]} define={'none'} onPress={this.onClose}>
                            <CBIcon define={'icon'} type={'ionicon'} name={'close-outline'} size={30}/>
                        </CBTouchableOpacity>
                    </CBView>
                </CBTouchableWithoutFeedback>
            </CBImageBackground>
        );
    }
}
