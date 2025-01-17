import React, {Component, forwardRef, useRef, useState} from 'react';
import {
    CBHeader,
    CBIcon,
    CBImageBackground,
    CBText,
    CBTouchableOpacity,
    CBView
} from 'components';
import {appStyles} from 'configs/styles';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import {observer} from 'mobx-react';
import colors from 'configs/colors';
import {strings} from "controls/i18n";
import {Formik} from 'formik';
import * as yup from 'yup';

const ReceiveContent = observer(({defaultParam, onRefresh, onBack}) => {

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
                <CBText style={[appStyles.heading, {fontSize: dimens.xLargeText, fontFamily: 'Rubik-Medium'}]}>{'Receive'}</CBText>
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

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_4')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} centerComponent={renderCenterHeader} rightComponent={renderRightHeader()}/>
        </CBImageBackground>
    );
});

export default ReceiveContent;
