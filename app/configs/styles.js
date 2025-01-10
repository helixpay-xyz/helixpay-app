import React from 'react';
import {StyleSheet} from 'react-native';
import {moderateScale} from 'utils/ThemeUtil';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    content: {
        flex: 1,
        backgroundColor: colors.contentColor
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrap: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    body: {
        flex: 1,
        padding: 15
    },
    shadow: {
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 3
    },
    heading: {
        fontSize: dimens.xxxLargeText,
        color: colors.primaryTextColor,
        fontFamily: 'NeueHaasDisplay-Mediu'
    },
    title: {
        fontSize: dimens.largeText,
        color: colors.primaryTextColor,
        fontFamily: 'NeueHaasDisplay-Bold'
    },
    label: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'NeueHaasDisplay-Bold'
    },
    text: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'NeueHaasDisplay-Roman'
    },
    subtext: {
        fontSize: dimens.normalText,
        color: colors.secondaryTextColor,
        fontFamily: 'NeueHaasDisplay-Regular'
    },
    caption: {
        fontSize: dimens.smallText,
        color: colors.tertiaryTextColor,
        fontFamily: 'NeueHaasDisplay-Light'
    },
    error: {
        fontSize: dimens.smallText,
        color: colors.errorTextColor,
        fontFamily: 'NeueHaasDisplay-Regular'
    },
    enfold: {
        width: dimens.widthScreen,
        height: dimens.heightScreen / 3
    },
    image: {
        width: moderateScale(240),
        height: moderateScale(240)
    },
    cover: {
        width: '100%',
        height: (0.9 * dimens.widthScreen) / 2
    },
    negative: {
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'NeueHaasDisplay-Regular',
        padding: 2
    },
    positive: {
        fontSize: dimens.mediumText,
        color: colors.primaryColor,
        fontFamily: 'NeueHaasDisplay-Regular',
        padding: 2
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 1,
        borderColor: colors.lineColor
    },
    button: {
        height: 45,
        borderRadius: 15
    },
    border: {
        borderWidth: 1,
        borderColor: colors.lineColor
    },
    divider: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.lineColor
    },
    space: {
        height: 10,
        backgroundColor: colors.hideColor
    },
    round: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.lineColor
    },
    circle: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32
    },
    sphere: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    action: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    symbol: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: colors.primaryColor,
        borderRadius: 4,
        marginHorizontal: 5,
        opacity: 0.3
    },
    bar: {
        width: 20,
        height: 8,
        backgroundColor: colors.primaryColor,
        borderRadius: 4,
        marginHorizontal: 5,
        opacity: 1
    },
    code: {
        width: 50,
        height: 50,
        paddingVertical: 0,
        paddingHorizontal: 15,
        fontSize: dimens.mediumText,
        color: colors.primaryTextColor,
        fontFamily: 'SpaceGrotesk-Regular',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: colors.lineColor,
        borderRadius: 15
    },
    input: {
        paddingHorizontal: 0
    },
    popup: {
        backgroundColor: colors.contentColor,
        padding: 15,
        borderRadius: 8
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },
    sheet: {
        width: dimens.widthScreen,
        paddingBottom: dimens.bottomSpace,
        backgroundColor: colors.contentColor,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    knob: {
        width: 45,
        height: 4,
        backgroundColor: colors.lineColor,
        borderRadius: 2,
        margin: 5
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
    },
    pack: {
        padding: 0,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    separator: {
        height: 1,
        backgroundColor: colors.lineColor
    },
    stroke: {
        width: 1,
        backgroundColor: colors.lineColor
    },
    wave: {
        position: 'absolute',
        alignSelf: 'center',
        width: '100%',
        height: 41,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.lineColor
    },
    mark: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    pie: {
        borderRadius: 20,
        backgroundColor: colors.contentColor
    }
});
