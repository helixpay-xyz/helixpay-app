import React, { Component } from 'react';
import {
    CBHeader,
    CBIcon,
    CBImageBackground,
    CBText,
    CBTouchableOpacity,
    CBView,
    CBImage,
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
import SelectDropdown from 'react-native-select-dropdown';
import * as yup from 'yup';

const assetData = [
    {
        "id": 1,
        "name": "BTC",
        "icon": "bitcoin",
        "balance": 0.1
    },
    {
        "id": 2,
        "name": "ETH",
        "icon": "eth",
        "balance": 2.0043
    },
    {
        "id": 3,
        "name": "USDT",
        "icon": "ic_usdt",
        "balance": 120
    }
]

const SendContent = observer(({defaultParam, onRefresh, onSend, onBack}) => {

    const onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
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
    }

    const emojisWithIcons = [
        {title: 'happy', icon: 'emoticon-happy-outline'},
        {title: 'cool', icon: 'emoticon-cool-outline'},
        {title: 'lol', icon: 'emoticon-lol-outline'},
        {title: 'sad', icon: 'emoticon-sad-outline'},
        {title: 'cry', icon: 'emoticon-cry-outline'},
        {title: 'angry', icon: 'emoticon-angry-outline'},
        {title: 'confused', icon: 'emoticon-confused-outline'},
        {title: 'excited', icon: 'emoticon-excited-outline'},
        {title: 'kiss', icon: 'emoticon-kiss-outline'},
        {title: 'devil', icon: 'emoticon-devil-outline'},
        {title: 'dead', icon: 'emoticon-dead-outline'},
        {title: 'wink', icon: 'emoticon-wink-outline'},
        {title: 'sick', icon: 'emoticon-sick-outline'},
        {title: 'frown', icon: 'emoticon-frown-outline'},
    ];

    const renderRecipient = () => {
        return (
            <CBView style={{marginHorizontal: 15, marginTop: 15}}>
                <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Medium'}]}>{'Recipient'}</CBText>
                <Formik
                    initialValues={{address: '', amount: 0}}
                    // validationSchema={validationSchema}
                    validateOnChange={true}
                    validateOnBlur={false}
                    onSubmit={onSend}>
                    {
                        ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                            <>
                                <CBInput
                                    containerStyle={{marginTop: 15, marginBottom: 0}}
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
                                        <CBView style={[appStyles.row]}>
                                            <CBImage style={{width: 32, height: 32}} source={ImageUtil.getImage('eth')} resizeMode={'contain'}/>
                                            <CBText style={[appStyles.text, {fontSize: dimens.xxxLargeText, fontFamily: 'GoogleSans-Medium', marginLeft: 10}]}>{'ETH'}</CBText>
                                        </CBView>
                                        {/*<SelectDropdown*/}
                                        {/*    data={emojisWithIcons}*/}
                                        {/*    onSelect={(selectedItem, index) => {*/}
                                        {/*        console.log(selectedItem, index);*/}
                                        {/*    }}*/}
                                        {/*    renderButton={(selectedItem, isOpened) => {*/}
                                        {/*        // return (*/}
                                        {/*        //     <CBView style={{width: 150, backgroundColor: '#E9ECEF', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3}}>*/}
                                        {/*        //         /!*{selectedItem && (*!/*/}
                                        {/*        //             <CBImage style={{width: 32, height: 32}} source={ImageUtil.getImage('bitcoin')} resizeMode={'contain'}/>*/}
                                        {/*        //         /!*)}*!/*/}
                                        {/*        //         <CBText>*/}
                                        {/*        //             {(selectedItem && selectedItem.name) || 'Select your mood'}*/}
                                        {/*        //         </CBText>*/}
                                        {/*        //         <CBIcon type={'ionicon'} name={isOpened ? 'chevron-up' : 'chevron-down'} size={25} />*/}
                                        {/*        //     </CBView>*/}
                                        {/*        // );*/}
                                        {/*        return (*/}
                                        {/*            <CBView>*/}
                                        {/*                <CBImage style={{width: 32, height: 32}} source={ImageUtil.getImage('bitcoin')} resizeMode={'contain'}/>*/}
                                        {/*                <CBText style={[appStyles.text, {fontSize: dimens.xxxLargeText, fontFamily: 'GoogleSans-Medium'}]}>{'BTC'}</CBText>*/}
                                        {/*            </CBView>*/}
                                        {/*        )*/}
                                        {/*    }}*/}
                                        {/*    showsVerticalScrollIndicator={false}*/}
                                        {/*    renderItem={(item, index, isSelected) => {*/}
                                        {/*        return (*/}
                                        {/*            // <CBTouchableOpacity key={index} style={[appStyles.row, {paddingVertical: 15, borderBottomWidth: 1}]} onPress={() => onRefresh(item)}>*/}
                                        {/*            //     <CBImage style={{width: 32, height: 32}} source={ImageUtil.getImage(item.icon)} resizeMode={'contain'}/>*/}
                                        {/*            //     <CBView style={{marginLeft: 10}}>*/}
                                        {/*            //         <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'GoogleSans-Medium'}]}>{item.name}</CBText>*/}
                                        {/*            //         <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: colors.grey3}]}>{item.balance} {item.name}</CBText>*/}
                                        {/*            //     </CBView>*/}
                                        {/*            // </CBTouchableOpacity>*/}
                                        {/*            <CBView>*/}
                                        {/*                <CBText>Ahihj</CBText>*/}
                                        {/*            </CBView>*/}
                                        {/*        );*/}
                                        {/*    }}*/}
                                        {/*    dropdownStyle={{ width: '40%', backgroundColor: '#E9ECEF', borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 3}}*/}
                                        {/*    buttonStyle={{height: 50, width: '40%', backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'row'}}*/}
                                        {/*/>*/}

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
        console.log(`mienpv :: ${JSON.stringify(item)}`);
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
