import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard} from 'react-native';
import DateUtil from 'utils/DateUtil';
import TimeUtil from 'utils/TimeUtil';
import DatePicker from 'react-native-date-picker';
import I18n from 'react-native-i18n';
import moment from 'moment';
import {strings} from 'controls/i18n';

const CBDateTimePicker = ({style, min, max, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', options = {}} = data;
    const init = () => {
        const initData = `${DateUtil.getCurrent()} ${TimeUtil.getCurrent()}`;
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
    const onCancel = () => {
        hide();
    };
    const onConfirm = (date) => {
        hide(() => {
            if (onPicked && typeof onPicked === 'function') {
                onPicked(moment(date).format('YYYY-MM-DD HH:mm'));
            }
        });
    };
    return (
        <DatePicker
            title={title}
            locale={I18n.locale}
            mode={'datetime'}
            modal={true}
            open={visible}
            date={new Date(value)}
            minimumDate={min ? new Date(min) : null}
            maximumDate={max ? new Date(max) : null}
            confirmText={strings('button_confirm')}
            cancelText={strings('button_cancel')}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default forwardRef(CBDateTimePicker);
