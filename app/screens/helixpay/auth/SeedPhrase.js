import React from 'react';
import {Keyboard} from 'react-native';
import RootNavigation from 'screens/RootNavigation';
import {CBImageBackground, CBInput, CBText, CBTouchableWithoutFeedback, CBView} from 'components';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import {ref, set } from "firebase/database";
import {db} from 'app/firebase/config';

import Base from 'screens/Base';
import EventTracker from 'controls/EventTracker';
import ImageUtil from "utils/ImageUtil";

export default class SeedPhrase extends Base {

    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            showPassword: false,
            showConfirmPassword: false
        };

        this.cbBottomPassword = React.createRef();
    }

    componentDidMount() {
        super.componentDidMount();
    }

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
        return (
            <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_1')}>
                <CBTouchableWithoutFeedback style={{flex: 1}} define={'none'} onPress={this.onBlur}>
                    <CBView style={[{flex: 1, paddingVertical: 15, paddingHorizontal: 15}, {borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar}]}>
                        <CBText style={[appStyles.heading, {marginTop: 60}]} define={'heading'}>{strings('text_secret_recovery_word')}</CBText>
                        <CBText style={[appStyles.subtext, {marginTop: 5}]} define={'subtext'}>{strings('text_subtitle_srw')}</CBText>
                    </CBView>
                </CBTouchableWithoutFeedback>
            </CBImageBackground>
        );
    }
}
