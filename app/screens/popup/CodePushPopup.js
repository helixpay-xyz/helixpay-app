import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard} from 'react-native';
import {CBButton, CBImage, CBText, CBView} from 'components';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {moderateScale} from 'utils/ThemeUtil';
import ImageUtil from 'utils/ImageUtil';
import Modal, {ModalContent, ScaleAnimation} from 'react-native-modals';
import * as Progress from 'react-native-progress';
import CodePush from 'react-native-code-push';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

const CodePushPopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {uri = '', title = '', label = '', messages = [], percent = 0, note = '', buttons = [], options = {}} = data;
    const init = () => {
        CodePush.sync({
            installMode: CodePush.InstallMode.IMMEDIATE
        }, codePushStatusDidChange, codePushDownloadDidProgress);
    };
    const codePushStatusDidChange = (syncStatus) => {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                setData(state => ({...state, title: strings('text_checking_for_update')}));
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                setData(state => ({...state, title: strings('text_downloading_package')}));
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                setData(state => ({...state, title: strings('text_awaiting_user_action')}));
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                setData(state => ({...state, title: strings('text_installing_update')}));
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                setData(state => ({...state, title: strings('text_up_to_date')}));
                hide();
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                setData(state => ({...state, title: strings('text_update_ignored')}));
                hide();
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                setData(state => ({...state, title: strings('text_update_installed')}));
                hide();
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                setData(state => ({...state, title: strings('text_unknown_error')}));
                hide();
                break;
            default:
                hide();
                break;
        }
    };
    const codePushDownloadDidProgress = (progress) => {
        setData(state => ({...state, percent: progress.receivedBytes / progress.totalBytes}));
    };
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true, init);
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
            EventTracker.logEvent('codepush_popup', {action: `click_button_${button.tracking}`});
        }
    };
    const {theme} = useTheme();
    const popupStyle = helpers('popup', theme.colors.scheme);
    const primaryColor = helpers('primary', theme.colors.scheme);
    const skeletonColor = helpers('skeleton', theme.colors.scheme);
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
                {percent > -1 ? <Progress.Bar
                    style={{marginTop: 10}}
                    color={primaryColor}
                    unfilledColor={skeletonColor}
                    borderWidth={0}
                    borderRadius={8}
                    height={8}
                    progress={percent}
                    width={(0.8 * dimens.widthScreen) - 35}/> : null}
                {note ? <CBText style={[appStyles.text, {textAlign: 'center', marginTop: 10}]} define={'text'}>{note}</CBText> : null}
                {buttons.length > 1 ? <CBView style={[appStyles.row, {justifyContent: 'space-between', marginTop: 15}]} define={'none'}>
                    <CBButton containerStyle={{width: buttonWith}} type={'outline'} title={buttons[0] && buttons[0].text ? buttons[0].text : ''} onPress={onPress(0)}/>
                    <CBButton containerStyle={{width: buttonWith}} title={buttons[1] && buttons[1].text ? buttons[1].text : ''} onPress={onPress(1)}/>
                </CBView> : buttons.length > 0 ? <CBButton containerStyle={{marginTop: 15}} title={buttons[0] && buttons[0].text ? buttons[0].text : ''} onPress={onPress(0)}/> : null}
            </ModalContent>
        </Modal>
    );
};

export default forwardRef(CodePushPopup);
