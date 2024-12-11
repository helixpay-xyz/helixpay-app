import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import {Icon, useTheme} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

const CBItemSheet = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {items = [], options = {}} = data;
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
    const onClose = () => {
        hide();
    };
    const onPress = (index) => () => {
        const item = items[index];
        if (item && item.onPress && typeof item.onPress === 'function') {
            hide(item.onPress);
        } else if (item && item.refId) {
            hide(() => CBControl.navigateWith(item.refId, item.defaultParam, item.injection));
        } else if (item && item.name) {
            if (onAction && typeof onAction === 'function') {
                hide(onAction(item.name));
            } else {
                hide();
            }
        } else {
            hide();
        }
        if (item && item.tracking) {
            EventTracker.logEvent('cb_item_sheet', {action: `click_button_${item.tracking}`});
        }
    };
    const {theme} = useTheme();
    const backgroundColor = helpers('background', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const primaryColor = helpers('primary', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const percent = dimens.heightScreen >= 1.8 * dimens.widthScreen ? (0.55 + Platform.select({android: 0.02, ios: 0})) : 0.65;
    const size = (dimens.widthScreen - 30) / 3;
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}>
            {options && (options.cancelable === true || options.cancelable === undefined) ? <TouchableOpacity style={[appStyles.action, {backgroundColor: backgroundColor, borderRadius: 20, margin: 10}]} onPress={onClose}>
                <Icon type={'ionicon'} name={'close-outline'} color={iconColor} size={25}/>
            </TouchableOpacity> : null}
            <View style={[appStyles.sheet, {height: percent * dimens.heightScreen}, style, sheetStyle]}>
                <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 15}} showsVerticalScrollIndicator={false}>
                    <View style={appStyles.wrap}>
                        {items.map((i, k) => <TouchableOpacity key={k} style={[appStyles.center, {justifyContent: 'flex-start'}, {width: size, height: size, padding: 15}]} onPress={onPress(k)}>
                            <View style={[appStyles.action, {backgroundColor: primaryColor, borderRadius: 15}]}>
                                <Icon type={i.type} name={i.name} color={i.color} size={i.size}/>
                            </View>
                            <Text style={[appStyles.text, {textAlign: 'center', marginTop: 15}, textStyle]}>{i.text}</Text>
                        </TouchableOpacity>)}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default forwardRef(CBItemSheet);
