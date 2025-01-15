import React, {Component, forwardRef, useRef, useState} from 'react';
import {
    CBHeader,
    CBIcon,
    CBImageBackground,
    CBText,
    CBTouchableOpacity,
    CBView,
    CBImage,
    CBItemPicker,
    CBFlatList,
    CBInput, CBButton, CBDivider
} from 'components';
import {appStyles} from 'configs/styles';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import {observer} from 'mobx-react';
import colors from 'configs/colors';
import {strings} from "controls/i18n";
import {Formik} from 'formik';
import * as yup from 'yup';

const assetData = [
    {
        "id": 1,
        "currency": "BTC",
        "icon": "bitcoin",
        "balance": 0.1
    },
    {
        "id": 2,
        "currency": "ETH",
        "icon": "eth",
        "balance": 2.0043
    },
    {
        "id": 3,
        "currency": "USDT",
        "icon": "usdt",
        "balance": 120
    }
]

const SendSuccessContent = observer(({defaultParam, order, onRefresh, onBack, onGoHome}) => {

    const cbItemPicker = useRef();

    const onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
    };

    const onOpenCurrency = () => {
        cbItemPicker.current.show({
            title: 'Select Currency',
            source: assetData,
            map: {text: 'name', value: 'currency'},
            button: strings('button_close')
        });
    };

    const renderLeftHeader = () => {
        return (
            <CBView style={[appStyles.row, {width: dimens.widthScreen / 2}]}>
                <CBTouchableOpacity style={{marginLeft: 5}} onPress={onBack}>
                    <CBIcon type={'ionicon'} name={'chevron-back-outline'} color={colors.white} size={26}/>
                </CBTouchableOpacity>
            </CBView>
        )
    }

    const renderContent = () => {
        return (
            <CBView style={{ marginHorizontal: 15, marginTop: 15, alignItems: 'center'}}>
                <CBImage style={{width: 96, height: 96, marginVertical: 15}} source={ImageUtil.getImage('check_success')} resizeMode={'contain'}/>
                <CBText style={[appStyles.text, {marginTop: 15, fontFamily: 'NeueHaasDisplay-Mediu', fontSize: dimens.xxLargeText}]}>{'Send Successful'}</CBText>
                <CBText style={[appStyles.caption, {marginTop: 10}]}>{'The recipient can check the balance in the funding wallet'}</CBText>
            </CBView>
        )
    };

    const renderTransactionDetail = () => {
        console.log(`mienpv :: ${JSON.stringify(order)}`);
        return (
            <CBView style={{ marginHorizontal: 15, marginTop: 30}}>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{order[2]?.label}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[2]?.value}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{order[3]?.label}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[3]?.value}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{order[0]?.label}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[0]?.value}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{order[4]?.label}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{order[4]?.value}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{'Date'}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{'Jan 15 2025 23:00:12'}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {paddingHorizontal: 15, marginBottom: 10, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.subtext]}>{'Order ID'}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.mediumText}]}>{'103948439'}</CBText>
                </CBView>
            </CBView>
        )
    };

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_4')}>
            <CBView style={{flex: 1, justifyContent: 'space-between'}}>
                <CBView>
                    <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()}/>
                    {renderContent()}
                    <CBDivider style={{marginTop: 30}}/>
                    {renderTransactionDetail()}
                </CBView>
                <CBView style={[appStyles.footer, {marginBottom: 15}]}>
                    <CBButton style={[appStyles.button, {width: dimens.widthScreen - 30, marginVertical: 15}]} buttonStyle={{height: 50}} titleStyle={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'NeueHaasDisplay-Mediu', color: colors.backgroundColor}]} title={'Done'} onPress={onGoHome}/>
                </CBView>
            </CBView>
        </CBImageBackground>
    );
});

export default SendSuccessContent;
