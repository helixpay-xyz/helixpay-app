import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import DateUtil from 'utils/DateUtil';
import {Icon, useTheme} from 'react-native-elements';
import {CalendarList} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

const CBDateMultiplePicker = ({style, min, max, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
    const {fromDate, toDate} = value || {fromDate: DateUtil.getCurrent(), toDate: DateUtil.getCurrent()};
    const init = () => {
        const initData = DateUtil.getCurrent();
        if ((!value || (value && !value.fromDate && !value.toDate)) && initData) {
            if (onPicked && typeof onPicked === 'function') {
                onPicked({fromDate: initData, toDate: initData});
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
    const onDayPress = ({dateString: date}) => {
        if (!fromDate || toDate) {
            if (onPicked && typeof onPicked === 'function') {
                onPicked({fromDate: date, toDate: ''})
            }
        } else {
            const diff = DateUtil.diff(date, fromDate);
            if (diff > 0) {
                hide(() => {
                    if (onPicked && typeof onPicked === 'function') {
                        onPicked({fromDate: fromDate, toDate: date})
                    }
                });
            }
            if (diff < 0) {
                hide(() => {
                    if (onPicked && typeof onPicked === 'function') {
                        onPicked({fromDate: date, toDate: fromDate})
                    }
                });
            }
        }
    };
    const {theme} = useTheme();
    const backgroundColor = helpers('background', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const hideColor = helpers('hide', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const labelStyle = helpers('label', theme.colors.scheme);
    const calendarStyles = helpers('calendar', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const percent = dimens.heightScreen >= 1.8 * dimens.widthScreen ? (0.55 + Platform.select({android: 0.02, ios: 0})) : 0.65;
    const renderHeader = (date) => {
        const month = date.toString('MMMM yyyy').replace(' / ', '/');
        return (
            <View style={[appStyles.row, {width: '100%'}]}>
                <Text style={[appStyles.text, {marginBottom: 10}, textStyle]}>{month}</Text>
            </View>
        );
    };
    const markedRanges = (array) => {
        let marked = {};
        array.forEach(date => marked = {...marked, [date]: {color: hideColor}});
        return marked;
    }
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
                <CalendarList
                    current={fromDate || toDate}
                    firstDay={1}
                    pastScrollRange={min}
                    futureScrollRange={max}
                    renderHeader={renderHeader}
                    markingType={'period'}
                    markedDates={{
                        [fromDate]: {startingDay: fromDate, endingDay: !toDate || fromDate === toDate, color: theme.colors.primary, textColor: '#FFFFFF'},
                        ...markedRanges(DateUtil.array(fromDate, toDate)),
                        ...toDate && fromDate !== toDate ? {[toDate]: {endingDay: true, color: theme.colors.primary, textColor: '#FFFFFF'}} : null
                    }}
                    onDayPress={onDayPress}
                    theme={calendarStyles}
                />
            </View>
        </Modal>
    );
};

export default forwardRef(CBDateMultiplePicker);
