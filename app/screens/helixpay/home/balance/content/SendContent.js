import React, { Component } from 'react';
import {CBHeader, CBIcon, CBImageBackground, CBText, CBTouchableOpacity, CBView, CBImage, CBFlatList} from 'components';
import {appStyles} from 'configs/styles';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import {observer} from 'mobx-react';
import colors from 'configs/colors';

const SendContent = observer(({defaultParam, onRefresh, onBack}) => {

    const renderLeftHeader = () => {
        return (
            <CBView style={[appStyles.row, {width: dimens.widthScreen / 2}]}>
                <CBTouchableOpacity style={{padding: 5}} onPress={onBack}>
                    <CBIcon type={'ionicon'} name={'chevron-back-outline'} color={colors.backgroundColor} size={30}/>
                </CBTouchableOpacity>
                <CBView style={{marginLeft: 5}}>
                    <CBText style={[appStyles.heading, {color: colors.backgroundColor, fontFamily: 'GoogleSans-Bold'}]} numberOfLines={1} define={'none'}>{'HelixPay.'}</CBText>
                </CBView>
            </CBView>
        )
    }

    const renderRightHeader = () => {
        return (
            <CBView style={[appStyles.row, {justifyContent: 'flex-end', width: dimens.widthScreen / 2}]}>
                <CBTouchableOpacity style={[appStyles.row, {marginRight: 5, backgroundColor: 'rgba(0, 0, 0, 0.25)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 18}]}>
                    <CBText style={[appStyles.text, {fontFamily: 'Saira-Medium', color: colors.white, marginRight: 5}]}>{'0x5a...3541'}</CBText>
                    <CBIcon type={'ionicon'} name={'copy-outline'} color={colors.white} size={18}/>
                </CBTouchableOpacity>
                <CBTouchableOpacity style={{marginRight: 15, backgroundColor: 'rgba(0, 0, 0, 0.25)', padding: 5, borderRadius: 18}}>
                    <CBIcon type={'ionicon'} name={'add-outline'} color={colors.white} size={26}/>
                </CBTouchableOpacity>
            </CBView>
        )
    }

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_2')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} rightComponent={renderRightHeader()}/>
        </CBImageBackground>
    );
});

export default SendContent;
