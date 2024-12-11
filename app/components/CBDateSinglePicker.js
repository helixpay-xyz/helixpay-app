import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import DateUtil from 'utils/DateUtil';
import {Icon, useTheme} from 'react-native-elements';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

const CBDateSinglePicker = ({style, min, max, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
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
    const onSubtractMonth = (addMonth) => () => {
        addMonth(-1);
    };
    const onAddMonth = (addMonth) => () => {
        addMonth(1);
    };
    const onTodayPress = () => {
        hide(() => {
            if (onPicked && typeof onPicked === 'function') {
                onPicked(DateUtil.getCurrent());
            }
        });
    };
    const onDayPress = ({dateString: date}) => {
        hide(() => {
            if (onPicked && typeof onPicked === 'function') {
                onPicked(date);
            }
        });
    };
    const {theme} = useTheme();
    const backgroundColor = helpers('background', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const primaryColor = helpers('primary', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const labelStyle = helpers('label', theme.colors.scheme);
    const calendarStyles = helpers('calendar', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const strokeStyle = helpers('stroke', theme.colors.scheme);
    const percent = dimens.heightScreen >= 1.8 * dimens.widthScreen ? (0.55 + Platform.select({android: 0.02, ios: 0})) : 0.65;
    const renderHeader = ({month: date, addMonth}) => {
        const month = date.toString('MMMM yyyy').replace(' / ', '/');
        return (
            <>
                <View style={[appStyles.row, {paddingHorizontal: 15}]}>
                    <View style={[appStyles.row, {flex: 1, marginRight: 15}]}>
                        <Text style={[appStyles.text, {flex: 1, marginRight: 15}, textStyle]}>{month}</Text>
                        <TouchableOpacity style={appStyles.action} onPress={onSubtractMonth(addMonth)}>
                            <Icon type={'ionicon'} name={'chevron-back-outline'} color={primaryColor} size={25}/>
                        </TouchableOpacity>
                        <View style={[appStyles.stroke, {height: 40}, strokeStyle]}/>
                        <TouchableOpacity style={appStyles.action} onPress={onAddMonth(addMonth)}>
                            <Icon type={'ionicon'} name={'chevron-forward-outline'} color={primaryColor} size={25}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={onTodayPress}>
                        <Text style={[appStyles.text, {color: primaryColor}]}>{strings('action_today')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 7}}>
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((i, k) => <Text key={k} style={[{width: 32}, {fontSize: 13, textAlign: 'center'}, textStyle, {marginTop: 2, marginBottom: 7}]}>{i}</Text>)}
                </View>
            </>
        );
    };
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
            <View style={[appStyles.sheet, {height: percent * dimens.heightScreen}, style, sheetStyle]}>
                <Text style={[appStyles.label, {textAlign: 'center', margin: 15}, labelStyle]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                <Calendar
                    current={value}
                    firstDay={1}
                    minDate={min}
                    maxDate={max}
                    hideArrows={true}
                    hideExtraDays={true}
                    customHeader={renderHeader}
                    markedDates={{[value]: {selected: true}}}
                    onDayPress={onDayPress}
                    theme={calendarStyles}
                    enableSwipeMonths={true}
                />
            </View>
        </Modal>
    );
};

export default forwardRef(CBDateSinglePicker);
