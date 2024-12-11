import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import TimeUtil from 'utils/TimeUtil';
import {Picker as RNPicker} from '@react-native-picker/picker';
import RNWPicker from 'react-native-wheelpicker';
import {Icon, useTheme} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

function makeRange(min, max) {
    const array = [];
    for (let i = min; i <= max; i++) {
        array.push(String(i < 10 ? ('0' + i) : i));
    }
    return array;
}

const Picker = Platform.select({android: RNWPicker, ios: RNPicker});
const CBTimePicker = ({style, min , max, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
    const hours = makeRange(0, 23);
    const minutes = makeRange(0, 59);
    const array = value && typeof value === 'string' ? value.split(':') : TimeUtil.getCurrent().split(':');
    const hour = hours.indexOf(array[0]);
    const minute = minutes.indexOf(array[1]);
    const init = () => {
        const initData = TimeUtil.getCurrent();
        if (!value && initData) {
            if (onPicked && typeof onPicked === 'function') {
                onPicked(initData);
            }
        }
    };
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true, data && data.options && data.options.init ? init : () => {});
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
    const onValidation = (time) => {
        if (min && TimeUtil.diff(min, time, 'minutes') > 0) {
            return min;
        } else if (max && TimeUtil.diff(time, max, 'minutes') > 0) {
            return max;
        } else {
            return time;
        }
    };
    const onValueChange = (name) => (index) => {
        if (onPicked && typeof onPicked === 'function') {
            const time = `${name === 'hour' ? hours[index] : array[0]}:${name === 'minute' ? minutes[index] : array[1]}`;
            onPicked(onValidation(time));
        }
    };
    const {theme} = useTheme();
    const backgroundColor = helpers('background', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const labelStyle = helpers('label', theme.colors.scheme);
    const waveStyle = helpers('wave', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}>
            {options && (options.cancelable === true || options.cancelable === undefined) ? <TouchableOpacity style={[appStyles.action, {backgroundColor: backgroundColor, borderRadius: 20, margin: 10}]} onPress={onClose}>
                <Icon type={'ionicon'} name={'close-outline'} color={iconColor} size={25}/>
            </TouchableOpacity> : null}
            <View style={[appStyles.sheet, {height: 266}, style, sheetStyle]}>
                <Text style={[appStyles.label, {textAlign: 'center', margin: 15}, labelStyle]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                <View style={[appStyles.row, {flex: 1}]}>
                    {Platform.OS === 'android' ? <View style={[appStyles.wave, waveStyle]}/> : null}
                    <Picker
                        style={{flex: 1, height: 216}}
                        selectedValue={hour > -1 ? hour : 0}
                        itemStyle={{fontSize: dimens.xLargeText, color: textStyle.color, fontFamily: 'GoogleSans-Regular'}}
                        itemSpace={25}
                        onValueChange={onValueChange('hour')}>
                        {hours.map((name, index) => (
                            <Picker.Item
                                key={index}
                                value={index}
                                label={name}
                            />
                        ))}
                    </Picker>
                    <Text style={[appStyles.text, {fontSize: dimens.xLargeText, marginBottom: Platform.select({android: 5, ios: 0})}, textStyle]}>{':'}</Text>
                    <Picker
                        style={{flex: 1, height: 216}}
                        selectedValue={minute > -1 ? minute : 0}
                        itemStyle={{fontSize: dimens.xLargeText, color: textStyle.color, fontFamily: 'GoogleSans-Regular'}}
                        itemSpace={25}
                        onValueChange={onValueChange('minute')}>
                        {minutes.map((name, index) => (
                            <Picker.Item
                                key={index}
                                value={index}
                                label={name}
                            />
                        ))}
                    </Picker>
                </View>
            </View>
        </Modal>
    );
};

export default forwardRef(CBTimePicker);
