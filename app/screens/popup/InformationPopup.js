import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard} from 'react-native';
import {CBButton, CBImage, CBText, CBView} from 'components';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {moderateScale} from 'utils/ThemeUtil';
import ImageUtil from 'utils/ImageUtil';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

const InformationPopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {uri = '', title = '', label = '', messages = [], note = '', buttons = [], options = {}} = data;
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
                {uri ? <CBImage containerStyle={[appStyles.image, {width: moderateScale(180), height: moderateScale(180), alignSelf: 'center'}]} source={ImageUtil.getImage(uri)} resizeMode={'contain'}/> : null}
                {title ? <CBText style={[appStyles.title, {textAlign: 'center', marginTop: 15}]} define={'title'}>{title}</CBText> : null}
                {label ? <CBText style={[appStyles.text, {marginTop: 10}]} define={'text'}>{label}</CBText> : null}
                {messages.length > 0 ? messages.map((message, index) => <CBText key={index} style={[appStyles.text, {marginLeft: 10}]} define={'text'}>{message}</CBText>) : null}
                {note ? <CBText style={[appStyles.text, {textAlign: 'center', marginTop: 10}]} define={'text'}>{note}</CBText> : null}
                {buttons.length > 1 ? <CBView style={[appStyles.row, {justifyContent: 'space-between', marginTop: 15}]} define={'none'}>
                    <CBButton containerStyle={{width: buttonWith}} type={'outline'} title={buttons[0] && buttons[0].text ? buttons[0].text : ''} onPress={onPress(0)}/>
                    <CBButton containerStyle={{width: buttonWith}} title={buttons[1] && buttons[1].text ? buttons[1].text : ''} onPress={onPress(1)}/>
                </CBView> : buttons.length > 0 ? <CBButton containerStyle={{marginTop: 15}} title={buttons[0] && buttons[0].text ? buttons[0].text : ''} onPress={onPress(0)}/> : null}
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(InformationPopup);
