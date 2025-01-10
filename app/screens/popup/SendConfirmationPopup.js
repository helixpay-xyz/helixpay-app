import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, useColorScheme} from 'react-native';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {CBIcon, CBView, CBImageBackground, CBText, CBDivider, CBImage, CBButton} from 'components';
import {helpers} from 'configs/themes';
import {useTheme} from 'react-native-elements';
import dimens from 'configs/dimens';
import colors from 'configs/colors';
import ImageUtil from 'utils/ImageUtil';
import {strings} from 'controls/i18n';

const SendConfirmationPopup = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {options = {}, title = '', order = []} = data;
    const show = (data = {}) => {
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

    const onClose = () => {
        hide();
    };

    const {theme} = useTheme();
    const scheme = useColorScheme();
    const knobStyle = helpers('knob', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    console.log(`mienpv :: ${JSON.stringify(order)}`);

    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            avoidKeyboard={true}>

            <CBView style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>
            <CBView style={[appStyles.sheet, style, sheetStyle]}>
                <CBView>
                    <CBView style={[appStyles.row, {padding: 15, justifyContent: 'space-between'}]}>
                        <CBText style={[appStyles.title, {fontSize: dimens.xLargeText}]} define={'title'}>{title}</CBText>
                        <CBIcon type={'ionicon'} name={'close-outline'} color={colors.white} size={24} onPress={onClose}/>
                    </CBView>
                    <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 15, justifyContent: 'space-between'}]}>
                        <CBView style={{justifyContent: 'flex-start'}}>
                            <CBText style={[appStyles.subtext, {fontSize: dimens.mediumText, marginBottom: 10}]}>{order[0]?.label}</CBText>
                            <CBText style={[appStyles.title, {fontSize: dimens.zettaLargeText}]}>{order[0]?.value}</CBText>
                        </CBView>
                        <CBView>
                            <CBText style={[appStyles.text, {fontSize: dimens.mediumText, marginBottom: 10}]}>{}</CBText>
                            <CBView style={appStyles.row}>
                                <CBImage style={{width: 36, height: 36, borderRadius: 18}} source={ImageUtil.getImage('viction')} resizeMode={'contain'}/>
                                <CBText style={[appStyles.text, {marginLeft: 5, fontFamily: 'NeueHaasDisplay-Mediu', fontSize: dimens.xxLargeText}]}>VIC</CBText>
                            </CBView>
                        </CBView>
                    </CBView>
                    <CBDivider/>
                    <CBView style={{marginTop: 15}}>
                        <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 5, justifyContent: 'space-between'}]}>
                            <CBText style={[appStyles.subtext]}>{order[2]?.label}</CBText>
                            <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[2]?.value}</CBText>
                        </CBView>
                        <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 5, justifyContent: 'space-between'}]}>
                            <CBText style={[appStyles.subtext]}>{order[3]?.label}</CBText>
                            <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[3]?.value}</CBText>
                        </CBView>
                        <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 5, justifyContent: 'space-between'}]}>
                            <CBText style={[appStyles.subtext]}>{order[4]?.label}</CBText>
                            <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[4]?.value}</CBText>
                        </CBView>
                    </CBView>
                    <CBButton style={{margin: 15}} buttonStyle={{height: 50}} titleStyle={[appStyles.text, { color: colors.backgroundColor}]} title={strings('button_next')} />
                </CBView>
            </CBView>
        </Modal>
    );
};

export default forwardRef(SendConfirmationPopup);
