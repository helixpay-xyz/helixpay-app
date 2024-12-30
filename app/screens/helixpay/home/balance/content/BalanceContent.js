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

    const renderBalance = () => {
        return (
            <CBView style={{backgroundColor: colors.backgroundColor, borderRadius: 20, marginHorizontal: 15, padding: 15, marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                <CBText style={[appStyles.text]}>{'Your balance'}</CBText>
                <CBView style={[appStyles.row]}>
                    <CBText style={[appStyles.heading, {fontFamily: 'Saira-SemiBold', fontSize: dimens.teraLargeText}]}>{'$32,128.80'}</CBText>
                    <CBView style={[appStyles.row, {backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 15}]}>
                        <CBView style={{borderWidth: 1, borderColor: colors.greenContent, borderRadius: 12, padding: 2}}>
                            <CBIcon type={'ionicon'} name={'arrow-up-outline'} color={colors.greenContent} size={12}/>
                        </CBView>
                        <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.greenContent, fontFamily: 'Saira-Medium', marginLeft: 3}]}>{'23.00%'}</CBText>
                    </CBView>
                </CBView>
                <CBView style={[appStyles.row, {marginTop: 15, marginBottom: 5, marginHorizontal: 15, justifyContent: 'space-between'}]}>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 15}} onPress={onSend}>
                        <CBIcon type={'feather'} name={'arrow-up-right'} color={colors.primaryColor} size={28}/>
                        <CBText style={[appStyles.text, {marginTop: 3, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'Send'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 15}}>
                        <CBIcon type={'feather'} name={'arrow-down-right'} color={colors.primaryColor} size={28}/>
                        <CBText style={[appStyles.text, {marginTop: 3, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'Receive'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 15}}>
                        <CBIcon type={'ionicon'} name={'bar-chart-outline'} color={colors.primaryColor} size={26}/>
                        <CBText style={[appStyles.text, {marginTop: 3, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'Stocks'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 15}}>
                        <CBIcon type={'ionicon'} name={'grid-outline'} color={colors.primaryColor} size={26}/>
                        <CBText style={[appStyles.text, {marginTop: 3, fontSize: dimens.normalText, color: colors.primaryTextColor, fontFamily: 'GoogleSans-Medium'}]}>{'More'}</CBText>
                    </CBTouchableOpacity>
                </CBView>
            </CBView>
        )
    }

    const renderTransaction = () => {
        return (
            <CBView style={{height: dimens.heightScreen / 1.5, backgroundColor: colors.backgroundColor, borderTopLeftRadius: 24, borderTopRightRadius: 24,  marginTop: 30, justifyContent: 'flex-start'}}>
                <CBView style={[appStyles.row, {paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between'}]}>
                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'Saira-Medium'}]}>{'Last Transaction'}</CBText>
                    <CBTouchableOpacity>
                        <CBText style={[appStyles.text, {color: colors.brandingColor400}]}>{'See all'}</CBText>
                    </CBTouchableOpacity>
                </CBView>
                <CBScrollView
                    refreshControl={<CBRefreshControl refreshing={true} onRefresh={onRefresh}/>}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}>
                    <CBView style={{paddingHorizontal: 20, marginTop: 20}}>
                        <CBFlatList
                            data={transactionData}
                            renderItem={({item, index}) => renderTransactionItem(item, index)}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}
                        />
                    </CBView>
                </CBScrollView>
            </CBView>
        )
    }

    const renderTransactionItem = (item, index) => {
        //test again
        const isPlus = item.type === 'deposit' || item.type === 'receive';
        return (
            <CBView key={index} style={[appStyles.row, {backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 15, marginBottom: 8}]}>
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
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_2')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} rightComponent={renderRightHeader()}/>
            {renderBalance()}
            {renderTransaction()}
        </CBImageBackground>
    );
});

export default BalanceContent;
