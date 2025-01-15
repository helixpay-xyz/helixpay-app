import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard} from 'react-native';
import {CBButton, CBInput, CBText, CBView} from 'components';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {moderateScale} from 'utils/ThemeUtil';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';
import {Formik} from 'formik';
import colors from "configs/colors";
import {strings} from "controls/i18n";

const CreateUsernamePopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', buttons = [], onCreateUser, options = {}} = data;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const fallback = (callback) => () => {
        if (callback) setTimeout(callback, 300);
    };
    const onDismiss = () => {
        if (options && options.onDismiss && typeof options.onDismiss === 'function') {
            options.onDismiss();
        }
    };
    const onTouchOutside = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
    };
    const onHardwareBackPress = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
        return true;
    };
    const onPress = (index) => () => {
        const button = buttons[index];
        if (button && button.onPress && typeof button.onPress === 'function') {
            hide(button.onPress);
        } else if (button && button.refId) {
            hide(() => CBControl.navigateWith(button.refId, button.defaultParam, button.injection));
        } else if (button && button.name) {
            if (onAction && typeof onAction === 'function') {
                hide(onAction(button.name));
            } else {
                hide();
            }
        } else {
            hide();
        }
        if (button && button.tracking) {
            EventTracker.logEvent('information_popup', {action: `click_button_${button.tracking}`});
        }
    };

    const onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
    };

    const {theme} = useTheme();
    const popupStyle = helpers('popup', theme.colors.scheme);
    const buttonWith = (0.8 * dimens.widthScreen - 45) / 2 - 2.75;
    return (
        <Modal
            onDismiss={onDismiss}
            onTouchOutside={onTouchOutside}
            onHardwareBackPress={onHardwareBackPress}
            width={0.8}
            visible={visible}
            modalAnimation={new ScaleAnimation()}>
            <ModalContent style={[appStyles.popup, popupStyle]}>
                <CBView style={{alignItems: 'center'}} >
                    <CBText style={[appStyles.title, {fontSize: moderateScale(20)}]}>{title}</CBText>
                    <Formik
                        initialValues={{username: ''}}
                        validateOnChange={true}
                        validateOnBlur={false}
                        onSubmit={onCreateUser}>
                        {
                            ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                                <>
                                    <CBInput
                                        containerStyle={{marginTop: 30, marginBottom: 0}}
                                        inputContainerStyle={{borderColor: !!values.username ? theme.colors.primary : theme.colors.gray}}
                                        rightIconContainerStyle={{paddingRight: 10}}
                                        placeholder={strings('placeholder_username')}
                                        returnKeyType={'go'}
                                        autoCapitalize={'none'}
                                        maxLength={64}
                                        value={values.username}
                                        // errorMessage={errors.password}
                                        onChangeText={handleChange('username')}
                                        onFocus={onToggleError(setFieldError, 'username')}
                                        onSubmitEditing={handleSubmit}
                                    />
                                    <CBButton style={{width: 120}} titleStyle={[appStyles.text, {color: colors.backgroundColor }]} onPress={handleSubmit} title={'Create'} />
                                </>

                            )
                        }
                    </Formik>
                </CBView>
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(CreateUsernamePopup);
