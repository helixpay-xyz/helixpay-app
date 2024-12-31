import React, { Component } from 'react';
import {
    CBContainer,
    CBHeader,
    CBIcon,
    CBImageBackground,
    CBRefreshControl,
    CBText,
    CBTouchableOpacity,
    CBView,
    CBScrollView, CBImage, CBFlatList
} from 'components';
import {appStyles} from 'configs/styles';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import {observer} from 'mobx-react';
import colors from 'configs/colors';

const transactionData = [
    {
        id: 1,
        title: 'Withdrawal',
        date: 'Dec 12, 24',
        totalValue: 0.022,
        status: 'completed',
        currency: 'Bitcoin',
        alias: 'BTC',
        icon: 'bitcoin',
        type: 'withdrawal',
        from: 'MetaMask',
        to: '0x5a...3541'
    },
    {
        id: 2,
        title: 'Deposit',
        date: 'Dec 10, 24',
        totalValue: 0.0234,
        status: 'completed',
        currency: 'Ethereum',
        alias: 'ETH',
        icon: 'eth',
        type: 'deposit',
        from: 'MetaMask',
        to: '0x5a...3541'
    },
    {
        id: 3,
        title: 'Send',
        date: 'Nov 31, 24',
        totalValue: 0.02431,
        status: 'completed',
        currency: 'Bitcoin',
        alias: 'BTC',
        icon: 'bitcoin',
        type: 'send',
        from: '0x4a...4355',
        to: '0x5a...3541'
    },
    {
        id: 4,
        title: 'Receive',
        date: 'Nov 20, 24',
        totalValue: 23,
        status: 'completed',
        currency: 'Solana',
        alias: 'SOL',
        icon: 'solana',
        type: 'receive',
        from: '0x7a...a355',
        to: '0x5a...3541'
    },
    {
        id: 5,
        title: 'Withdrawal',
        date: 'Nov 01, 24',
        totalValue: 0.35,
        status: 'completed',
        currency: 'Ethereum',
        alias: 'ETH',
        icon: 'eth',
        type: 'withdrawal',
        from: 'MetaMask',
        to: '0x5a...3541'
    },
    {
        id: 6,
        title: 'Deposit',
        date: 'Oct 31, 24',
        totalValue: 120,
        status: 'completed',
        currency: 'Solana',
        alias: 'SOL',
        icon: 'solana',
        type: 'deposit',
        from: 'C98 Wallet',
        to: '0x5a...3531'
    },
    {
        id: 7,
        title: 'Withdrawal',
        date: 'Oct 20, 24',
        totalValue: 0.0023,
        status: 'completed',
        currency: 'Bitcoin',
        alias: 'BTC',
        icon: 'bitcoin',
        type: 'withdrawal',
        from: 'MetaMask',
        to: '0x5a...3541'
    }
]

const BalanceContent = observer(({defaultParam, onRefresh, onSend}) => {

    const renderLeftHeader = () => {
        return (
            <CBView style={[appStyles.row, {width: dimens.widthScreen / 2}]}>
                <CBImage containerStyle={{marginLeft: 5, borderRadius: 30}} style={{width: 42, height: 42}} source={ImageUtil.getImage('avatar')}/>
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

    const renderBalance = () => {
        return (
            <CBView style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, marginHorizontal: 15, padding: 15, marginTop: 30}}>
                <CBView style={appStyles.row}>
                    <CBText style={[appStyles.text, {marginRight: 8, marginTop: 5}]}>{'Total balance'}</CBText>
                    <CBView style={[appStyles.row, {backgroundColor: colors.greenContent, paddingHorizontal: 5, paddingVertical: 4, borderRadius: 12}]}>
                        <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.primaryTextDarkColor, marginLeft: 3}]}>{'23.00%'}</CBText>
                    </CBView>
                </CBView>
                <CBView style={[appStyles.row, {marginTop: 15}]}>
                    <CBText style={[appStyles.heading, {fontSize: dimens.yottaLargeText}]}>{'$32,128.80'}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {marginTop: 30, marginBottom: 5, marginHorizontal: 15, justifyContent: 'center'}]}>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}} onPress={onSend}>
                        <CBView style={{backgroundColor: colors.brandingColor200, padding: 15, borderRadius: 30}}>
                            <CBIcon type={'ionicon'} name={'arrow-up-outline'} color={colors.backgroundColor} size={26}/>
                        </CBView>
                        <CBText style={[appStyles.text, {marginTop: 5, fontSize: dimens.normalText, fontFamily: 'GoogleSans-Medium'}]}>{'Send'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}}>
                        <CBView style={{backgroundColor: colors.brandingColor200, padding: 15, borderRadius: 30}}>
                            <CBIcon type={'ionicon'} name={'arrow-down-outline'} color={colors.backgroundColor} size={26}/>
                        </CBView>
                        <CBText style={[appStyles.text, {marginTop: 5, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'Receive'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}}>
                        <CBView style={{backgroundColor: colors.brandingColor200, padding: 15, borderRadius: 30}}>
                            <CBIcon type={'ionicon'} name={'swap-horizontal-outline'} color={colors.backgroundColor} size={26}/>
                        </CBView>
                        <CBText style={[appStyles.text, {marginTop: 5, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'Stocks'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}}>
                        <CBView style={{backgroundColor: colors.brandingColor200, padding: 15, borderRadius: 30}}>
                            <CBIcon type={'ionicon'} name={'grid-outline'} color={colors.backgroundColor} size={26}/>
                        </CBView>
                        <CBText style={[appStyles.text, {marginTop: 5, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'More'}</CBText>
                    </CBTouchableOpacity>
                </CBView>
            </CBView>
        )
    }

    const renderTransaction = () => {
        return (
            <CBView style={{ marginTop: 15}}>
                <CBView style={[appStyles.row, {paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.text, {fontSize: dimens.largeText}]}>{'Last Transaction'}</CBText>
                    <CBTouchableOpacity>
                        <CBText style={[appStyles.text, {color: colors.brandingColor400}]}>{'See all'}</CBText>
                    </CBTouchableOpacity>
                </CBView>
                    <CBView style={{marginTop: 15, paddingHorizontal: 20, justifyContent: 'flex-start'}}>
                        <CBFlatList
                            data={transactionData}
                            renderItem={({item, index}) => renderTransactionItem(item, index)}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </CBView>
            </CBView>
        )
    }

    const renderTransactionItem = (item, index) => {
        //test again
        const isPlus = item.type === 'deposit' || item.type === 'receive';
        return (
            <CBView key={index} style={[appStyles.row, {backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 15, marginBottom: 10}]}>
                <CBView style={[appStyles.row, {flex: 1}]}>
                    <CBImage containerStyle={{borderTopLeftRadius: 15, borderTopRightRadius: 15}} style={{width: 32, height: 32}} source={ImageUtil.getImage(item.icon)}/>
                    <CBView style={{marginLeft: 10}}>
                        <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Medium'}]}>{item.currency}</CBText>
                        <CBText style={[appStyles.subtext, {color: colors.primaryTextColor}]}>{item.alias}</CBText>
                    </CBView>
                </CBView>
                <CBView style={[appStyles.row, {flex: 1, justifyContent: 'flex-end'}]}>
                    <CBText style={[appStyles.subtext, {fontFamily: 'GoogleSans-Medium'}]}>{item.title}</CBText>
                </CBView>
                <CBView style={{alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end'}}>
                    <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: isPlus ? colors.greenContent : colors.redContent, fontFamily: 'GoogleSans-Medium'}]}>{`${isPlus ? '+' : '-'}${item.totalValue}${item.alias}`}</CBText>
                    <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.primaryTextColor, marginLeft: 5}]}>{item.date}</CBText>
                </CBView>
            </CBView>
        )
    }

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_4')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} rightComponent={renderRightHeader()}/>
            {renderBalance()}
            {renderTransaction()}
        </CBImageBackground>
    );
});

export default BalanceContent;
