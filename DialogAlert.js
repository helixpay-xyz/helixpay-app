import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Image, Keyboard, Text, View} from 'react-native';
import Modal, {ModalButton, ModalContent, ModalFooter, ScaleAnimation} from 'react-native-modals';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import CBHandler from 'handlers/CBHandler';
import ImageUtil from 'utils/ImageUtil';
import HTMLView from 'react-native-htmlview';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';

const DialogAlert = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        alert,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', message = '', buttons = [], options = {}} = data;
    const {uri = '', children = null, html = ''} = options;
    const alert = (title = '', message = '', buttons = [], options = {}) => {
        Keyboard.dismiss();
        setData({title, message, buttons, options});
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
    const onClose = () => {
        hide();
        EventTracker.logEvent('master_popup', {action: 'click_button_close'});
    };
    const onLinkPress = (url) => {
        if (url && url.startsWith('http')) {
            hide(() => CBHandler.openUrl(url));
        } else if (url && url.length > 0) {
            const array = url.split('~');
            hide(() => CBControl.navigateWith(array[0], array[1], array[2]));
        } else {
            hide();
        }
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
            EventTracker.logEvent('master_popup', {action: `click_button_${button.tracking}`});
        }
    };
    const {theme} = useTheme();
    const contentStyle = helpers('content', theme.colors.scheme);
    const borderStyle = helpers('border', theme.colors.scheme);
    const negativeStyle = helpers('negative', theme.colors.scheme);
    const positiveStyle = helpers('positive', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const htmlStyles = helpers('html', theme.colors.scheme);
    const renderButtons = () => {
        if (options && options.hideButtons) return null;
        if (buttons.length > 1) {
            return (
                <ModalFooter style={borderStyle}>
                    <ModalButton
                        key={'negative'}
                        style={borderStyle}
                        text={buttons[0] && buttons[0].text ? buttons[0].text.toUpperCase() : ''}
                        textStyle={buttons[0]?.buttonTextStyle ? buttons[0]?.buttonTextStyle : [appStyles.negative, negativeStyle]}
                        onPress={onPress(0)}
                    />
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={buttons[1] && buttons[1].text ? buttons[1].text.toUpperCase() : ''}
                        textStyle={buttons[1]?.buttonTextStyle ? buttons[1]?.buttonTextStyle : [appStyles.positive, positiveStyle]}
                        onPress={onPress(1)}
                        bordered={true}
                    />
                </ModalFooter>
            );
        } else if (buttons.length > 0) {
            return (
                <ModalFooter style={borderStyle}>
                    <View style={{height: 1}}/>
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={buttons[0] && buttons[0].text ? buttons[0].text.toUpperCase() : ''}
                        textStyle={buttons[0]?.buttonTextStyle ? buttons[0]?.buttonTextStyle : [appStyles.positive, positiveStyle]}
                        onPress={onPress(0)}
                    />
                </ModalFooter>
            );
        } else {
            return (
                <ModalFooter style={borderStyle}>
                    <View style={{height: 1}}/>
                    <ModalButton
                        key={'positive'}
                        style={borderStyle}
                        text={strings('button_close').toUpperCase()}
                        textStyle={[appStyles.positive, positiveStyle]}
                        onPress={onClose}
                    />
                </ModalFooter>
            );
        }
    };
    return (
        <Modal
            onDismiss={onDismiss}
            onTouchOutside={onTouchOutside}
            onHardwareBackPress={onHardwareBackPress}
            width={0.9}
            visible={visible}
            modalStyle={contentStyle}
            modalAnimation={new ScaleAnimation()}
            modalTitle={uri ? <Image style={appStyles.cover} source={ImageUtil.getImage(uri)}/> : null}
            footer={renderButtons()}>
            <ModalContent style={[{paddingHorizontal: 15}, contentStyle]}>
                {title ? <Text style={[appStyles.title, {textAlign: 'center', marginTop: uri ? 24 : 0}, textStyle]}>{title}</Text>: null}
                {message ? <Text style={[appStyles.text, {textAlign: 'center', marginTop: title ? 10 : uri ? 24 : 0}, textStyle]}>{message}</Text> : null}
                {html ? <HTMLView
                    style={{marginTop: 10}}
                    stylesheet={htmlStyles}
                    textComponentProps={{style: [htmlStyles.p, {textAlign: 'center'}]}}
                    value={html}
                    onLinkPress={onLinkPress}
                /> : null}
                {children}
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(DialogAlert);
