import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import DateUtil from 'utils/DateUtil';
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
const CBDatePicker = ({style, min, max, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
    const years = makeRange(1900, 2100);
    const months = makeRange(1, 12);
    const days = makeRange(1, 31);
    const array = value && typeof value === 'string' ? value.split('-') : DateUtil.getCurrent().split('-');
    const year = years.indexOf(array[0]);
    const month = months.indexOf(array[1]);
    const day = days.indexOf(array[2]);
    const init = () => {
        const initData = DateUtil.getCurrent();
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
    const onValidation = (date) => {
        if (min && DateUtil.diff(min, date, 'days') > 0) {
            return min;
        } else if (max && DateUtil.diff(date, max, 'days') > 0) {
            return max;
        } else {
            return date;
        }
    };
    const onValueChange = (name) => (index) => {
        if (onPicked && typeof onPicked === 'function') {
            const date = `${name === 'year' ? years[index] : array[0]}-${name === 'month' ? months[index] : array[1]}-${name === 'day' ? days[index] : array[2]}`;
            const strings = date.split('-');
            const year = parseInt(strings[0]);
            const month = parseInt(strings[1]);
            const day = parseInt(strings[2]);
            const endOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                endOfMonths[1] = 29;
            }
            const compareDay = endOfMonths[month - 1];
            if (day < 0 || day > compareDay) {
                onPicked(onValidation(`${date.slice(0, 8)}${compareDay}`));
            } else {
                onPicked(onValidation(date));
            }
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
                        selectedValue={day > -1 ? day : 0}
                        itemStyle={{fontSize: dimens.xLargeText, color: textStyle.color, fontFamily: 'GoogleSans-Regular'}}
                        itemSpace={25}
                        onValueChange={onValueChange('day')}>
                        {days.map((name, index) => (
                            <Picker.Item
                                key={index}
                                value={index}
                                label={name}
                            />
                        ))}
                    </Picker>
                    <Text style={[appStyles.text, {fontSize: dimens.xLargeText, marginBottom: Platform.select({android: 5, ios: 0})}, textStyle]}>{'/'}</Text>
                    <Picker
                        style={{flex: 1, height: 216}}
                        selectedValue={month > -1 ? month : 0}
                        itemStyle={{fontSize: dimens.xLargeText, color: textStyle.color, fontFamily: 'GoogleSans-Regular'}}
                        itemSpace={25}
                        onValueChange={onValueChange('month')}>
                        {months.map((name, index) => (
                            <Picker.Item
                                key={index}
                                value={index}
                                label={name}
                            />
                        ))}
                    </Picker>
                    <Text style={[appStyles.text, {fontSize: dimens.xLargeText, marginBottom: Platform.select({android: 5, ios: 0})}, textStyle]}>{'/'}</Text>
                    <Picker
                        style={{flex: 1, height: 216}}
                        selectedValue={year > -1 ? year : 0}
                        itemStyle={{fontSize: dimens.xLargeText, color: textStyle.color, fontFamily: 'GoogleSans-Regular'}}
                        itemSpace={25}
                        onValueChange={onValueChange('year')}>
                        {years.map((name, index) => (
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

export default forwardRef(CBDatePicker);
