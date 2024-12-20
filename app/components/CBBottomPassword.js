import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {Button, Icon, Input, useTheme} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import colors from 'configs/colors';
import dimens from "configs/dimens";
import {CBButton, CBText, CBView} from "app/components/index";
import {strings} from "controls/i18n";

const CBBottomPassword = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide,
        clear
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const [value, setValue] = useState('');
    const {title = '', message = '', strongType, onConfirm, buttons = [], options = {}} = data;
    const swipeDirection = options && (options.cancelable === true || options.cancelable === undefined) ? ['down'] : null;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const clear = () => setValue('');
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
    const onSwipeOut = () => {
        hide();
    };

    // const onConfirmButton = () => {
    //     hide(onConfirm);
    // }

    const {theme} = useTheme();
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={swipeDirection}
            avoidKeyboard={true}>
            <View style={[appStyles.knob, {alignSelf: 'center'}]}/>
            <View style={[appStyles.sheet, {height: 286, backgroundColor: colors.bottomModalColor, paddingHorizontal: 30}, style]}>
                {title ? <Text style={[appStyles.title, {fontSize: dimens.xxLargeText, marginTop: 30}]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text> : null}
                {message ? <Text style={[appStyles.text, {fontSize: dimens.normalText, marginTop: 10}]}>{message}</Text> : null}
                <Text style={[appStyles.text, {fontSize: dimens.smallText, marginTop: 10, color: colors.brandingColor200}]}>{'Learn more'}</Text>

                <Text style={[appStyles.text, {fontSize: dimens.normalText, marginTop: 25}]}>{'Security Level:'}</Text>
                <View style={[appStyles.row, {justifyContent: 'space-between', marginTop: 5}]} define={'none'}>
                    <View style={[appStyles.row]}>
                        <View style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 1 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                        <View style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 2 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                        <View style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 3 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                        <View style={{width: (dimens.widthScreen - 45) / 6, height: 3, borderRadius: 2, backgroundColor: strongType >= 4 ? theme.colors.primary : 'rgba(255, 255, 255, 0.2)', marginRight: 5}} define={'none'}/>
                    </View>
                    <Text style={[appStyles.text, {color: theme.colors.primary, fontSize: dimens.normalText, fontFamily: 'SpaceGrotesk-Medium'}]}>{strongType > 2 ? 'Strong' : 'Week'}</Text>
                </View>
                {/*<CBButton containerStyle={{ marginTop: 15 }} buttonStyle={appStyles.button} title={strings('button_understand')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor }]} onPress={onConfirmButton}/>*/}
            </View>
        </Modal>
    );
};

export default forwardRef(CBBottomPassword);
