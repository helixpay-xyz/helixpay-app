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
    CBInput, CBButton
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

const SendContent = observer(({defaultParam, onRefresh, onSend, onBack}) => {

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

    const onCurrencyPicked = (setFieldValue, setFieldError) => (currency) => {
        setFieldValue('item', currency);
        setFieldError('item', '');
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

    const renderCenterHeader = () => {
        return (
            <CBView style={{justifyContent: 'center', alignItems: 'center'}}>
                <CBText style={[appStyles.heading, {fontSize: dimens.xLargeText, fontFamily: 'Rubik-Medium'}]}>{'Send'}</CBText>
            </CBView>
        )
    }

    const renderRightHeader = () => {
        return (
            <CBView style={[appStyles.row, {justifyContent: 'flex-end', width: dimens.widthScreen / 2}]}>
                <CBTouchableOpacity style={{marginRight: 15}}>
                    <CBIcon type={'ionicon'} name={'information-circle-outline'} color={colors.white} size={28}/>
                </CBTouchableOpacity>
            </CBView>
        )
    };

    const renderRecipient = () => {
        return (
            <CBView style={{marginHorizontal: 15, marginTop: 15}}>
                <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Medium'}]}>{'Recipient'}</CBText>
                <Formik
                    initialValues={{address: '', amount: 0, currency: ''}}
                    // validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={onSend}>
                    {
                        ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                            <>
                                <CBInput
                                    containerStyle={{marginTop: 5, marginBottom: 0}}
                                    inputContainerStyle={{borderWidth: 0}}
                                    placeholder={strings('placeholder_address')}
                                    returnKeyType={'go'}
                                    autoCapitalize={'none'}
                                    maxLength={300}
                                    value={values.address}
                                    errorMessage={errors.address}
                                    onChangeText={handleChange('address')}
                                    onFocus={onToggleError(setFieldError, 'address')}
                                    onSubmitEditing={handleSubmit}
                                />
                                <CBView style={{marginTop: 5}}>
                                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Medium'}]}>{'Asset'}</CBText>
                                    <CBView style={[appStyles.row, {marginTop: 10, justifyContent: 'space-between'}]}>
                                        {/*<CBInput*/}
                                        {/*    containerStyle={{marginTop: 5, width: '40%'}}*/}
                                        {/*    rightIcon={*/}
                                        {/*        <CBTouchableOpacity style={appStyles.action} define={'none'} onPress={onOpenCurrency}>*/}
                                        {/*            <CBIcon define={'icon'} type={'ionicon'} name={'chevron-down-outline'} size={20}/>*/}
                                        {/*        </CBTouchableOpacity>*/}
                                        {/*    }*/}
                                        {/*    placeholder={strings('placeholder_problem')}*/}
                                        {/*    InputComponent={forwardRef(({style: {color, height, paddingVertical, paddingHorizontal}, placeholderTextColor, placeholder}, ref) => <CBTouchableOpacity style={[appStyles.row, {flex: 1, height, paddingVertical, paddingHorizontal}]} define={'none'} onPress={onOpenCurrency}>*/}
                                        {/*        <CBText style={[appStyles.text, {color: !values.item ? placeholderTextColor : color}]} numberOfLines={1} ellipsizeMode={'tail'}>{!values.item ? placeholder : values.item.name}</CBText>*/}
                                        {/*    </CBTouchableOpacity>)}*/}
                                        {/*    errorMessage={errors.item}*/}
                                        {/*/>*/}
                                        {/*<CBItemPicker ref={cbItemPicker} value={values.currency} onPicked={onCurrencyPicked(setFieldValue, setFieldError)}/>*/}
                                        <CBView style={appStyles.row}>
                                            <CBImage style={{width: 36, height: 36, borderRadius: 18}} source={ImageUtil.getImage('viction')} resizeMode={'contain'}/>
                                            <CBText style={[appStyles.text, {marginLeft: 5, fontFamily: 'NeueHaasDisplay-Mediu', fontSize: dimens.xxLargeText}]}>VIC</CBText>
                                        </CBView>

                                        <CBInput
                                            containerStyle={{height: 50, marginBottom: 0, width: '20%', padding: 0}}
                                            inputContainerStyle={{borderBottomWidth: 0, borderWidth: 0,}}
                                            // placeholder={strings('placeholder_address')}
                                            inputStyle={[appStyles.text, {marginBottom: 0, fontSize: dimens.xxxLargeText, textAlign: 'right'}]}
                                            keyboardType={'phone-pad'}
                                            selectionColor="white"
                                            maxLength={300}
                                            value={values.amount}
                                            errorMessage={errors.amount}
                                            // onChangeText={handleChange('amount')}
                                            onChangeText={(text) => {
                                                const numericText = text.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
                                                handleChange('amount')(numericText); // Update the state with filtered value
                                            }}
                                            onFocus={onToggleError(setFieldError, 'amount')}
                                            onSubmitEditing={handleSubmit}
                                        />
                                    </CBView>
                                </CBView>
                                <CBView style={{ marginTop: 'auto', marginBottom: 30 }}>
                                    <CBButton containerStyle={{ marginTop: 15 }} buttonStyle={appStyles.button} title={strings('button_send')} titleStyle={[appStyles.text, { color: colors.backgroundColor,fontFamily: 'NeueHaasDisplay-Mediu'}]} onPress={handleSubmit}/>
                                </CBView>
                                {/*<CBButton disabled={!values?.seedPhrase} containerStyle={{ marginTop: 15, }} buttonStyle={appStyles.button} title={strings('button_confirm')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor }]} onPress={handleSubmit}/>*/}
                                {/*{!!values?.seedPhrase ? <CBText style={[appStyles.caption, {marginTop: 5, color: isMatch ? colors.greenContent : colors.errorTextColor}]}>{isMatch ? 'Matching' : 'Not match'}</CBText> : null}*/}
                            </>
                        )
                    }
                </Formik>
            </CBView>
        )
    };

    const renderAssetItem = ({item, index, isSelected}) => {
        return (
            <CBTouchableOpacity key={index} style={[appStyles.row, {paddingVertical: 15, borderBottomWidth: 1}]} onPress={() => onRefresh(item)}>
                <CBImage style={{width: 32, height: 32}} source={ImageUtil.getImage(item.icon)} resizeMode={'contain'}/>
                <CBView style={{marginLeft: 10}}>
                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Medium'}]}>{item.name}</CBText>
                    <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: colors.grey3}]}>{item.balance} {item.name}</CBText>
                </CBView>
            </CBTouchableOpacity>
        )
    }

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_4')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} centerComponent={renderCenterHeader} rightComponent={renderRightHeader()}/>
            {renderRecipient()}
        </CBImageBackground>
    );
});

export default SendContent;
