import React, {useEffect, useRef} from 'react';
import {CBHeader, CBIcon, CBImageBackground, CBText, CBTouchableOpacity, CBView, CBImage, CBFlatList} from 'components';
import {appStyles} from 'configs/styles';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import {observer} from 'mobx-react';
import colors from 'configs/colors';
import CreateUsernamePopup from 'screens/popup/CreateUsernamePopup';

const BalanceContent = observer(({defaultParam, refreshing, username, address, balances, transactions, onCreateUser, onCopyAddress, onRefresh, onSend, onReceive}) => {

    const createUsernamePopup = useRef(null);

    useEffect(() => {
        if (!username) {
            createUsernamePopup.current.show({
                title: 'Create username',
                onCreateUser: onCreateUser,
            });
        }
    }, []);

    const shortenAddress = (address) => {
        return `${address?.slice(0, 4)}...${address?.slice(-3)}`;
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
        }).format(value);
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const renderLeftHeader = () => {
        return (
            <CBView style={[appStyles.row, {width: dimens.widthScreen / 2}]}>
                <CBText style={[appStyles.heading, {marginLeft: 15, fontSize: dimens.xLargeText}]} numberOfLines={1}>{'PendaPay'}</CBText>
                {/*<CBImage containerStyle={{marginLeft: 5, borderRadius: 30}} style={{width: 42, height: 42}} source={ImageUtil.getImage('avatar')}/>*/}
            </CBView>
        )
    }

    const renderRightHeader = () => {
        return (
            <CBView style={[appStyles.row, {justifyContent: 'flex-end', width: dimens.widthScreen / 2}]}>
                <CBTouchableOpacity style={{marginRight: 5, padding: 5, borderRadius: 18}}>
                    <CBIcon type={'ionicon'} name={'qr-code-outline'} color={colors.white} size={24}/>
                </CBTouchableOpacity>
                <CBTouchableOpacity style={{marginRight: 15, padding: 5, borderRadius: 18}}>
                    <CBIcon type={'ionicon'} name={'add-outline'} color={colors.white} size={28}/>
                </CBTouchableOpacity>
            </CBView>
        )
    }

    const renderBalance = () => {
        return (
            <CBView style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, marginHorizontal: 15, padding: 15, marginTop: 30}}>
                <CBView style={[appStyles.row, {justifyContent: 'space-between'}]}>
                    <CBView style={appStyles.row}>
                        <CBText style={[appStyles.text, {marginRight: 8, marginTop: 5}]}>{'Total balance'}</CBText>
                        <CBView style={[appStyles.row, {backgroundColor: colors.greenContent, paddingHorizontal: 5, paddingVertical: 4, borderRadius: 12}]}>
                            <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.primaryTextDarkColor, marginLeft: 3}]}>{'23.00%'}</CBText>
                        </CBView>
                    </CBView>
                    <CBIcon type={'ionicon'} name={'refresh-circle-outline'} color={colors.primaryTextColor} size={26} onPress={onRefresh}/>
                </CBView>
                <CBView style={[appStyles.row, {marginTop: 15}]}>
                    <CBText style={[appStyles.heading, {fontSize: dimens.yottaLargeText}]}>{balances ? `${formatCurrency(balances?.usdValue)}` : 'Loading...'}</CBText>
                </CBView>
                <CBView style={[appStyles.row, {marginTop: 30, marginBottom: 5, marginHorizontal: 15, justifyContent: 'center'}]}>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}} onPress={onSend}>
                        <CBView style={{backgroundColor: colors.brandingColor200, padding: 15, borderRadius: 30}}>
                            <CBIcon type={'ionicon'} name={'arrow-up-outline'} color={colors.backgroundColor} size={26}/>
                        </CBView>
                        <CBText style={[appStyles.text, {marginTop: 5, fontSize: dimens.normalText, fontFamily: 'GoogleSans-Medium'}]}>{'Send'}</CBText>
                    </CBTouchableOpacity>
                    <CBTouchableOpacity style={{width: dimens.widthScreen / 5 - 3, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5}} onPress={onReceive}>
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
                    <CBText style={[appStyles.text, {fontSize: dimens.largeText, fontFamily: 'NeueHaasDisplay-Mediu'}]}>{'Last Transaction'}</CBText>
                    <CBTouchableOpacity>
                        <CBText style={[appStyles.text, {color: colors.brandingColor400}]}>{'See all'}</CBText>
                    </CBTouchableOpacity>
                </CBView>
                    <CBView style={{height:  dimens.heightScreen, marginTop: 15, paddingHorizontal: 20, justifyContent: 'flex-start'}}>
                        <CBFlatList
                            refreshing={refreshing}
                            data={transactions}
                            renderItem={({item, index}) => renderTransactionItem(item, index)}
                            keyExtractor={(item) => item.blockNumber.toString()}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps={'always'}
                            onRefresh={onRefresh}
                        />
                    </CBView>
            </CBView>
        )
    }

    const renderTransactionItem = (item, index) => {
        const date = new Date(item.timestamp * 1000);

        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        });
        const isPlus = item.type === 'deposit' || item.method === 'transfer';
        return (
            <CBView key={index} style={[appStyles.row, {backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 15, marginBottom: 10}]}>
                <CBView style={[appStyles.row, {flex: 1}]}>
                    <CBImage containerStyle={{borderRadius: 15}} style={{width: 32, height: 32}} source={ImageUtil.getImage('viction')}/>
                    <CBView style={{marginLeft: 10}}>
                        <CBText style={[appStyles.text, {fontFamily: 'GoogleSans-Medium'}]}>{'Viction'}</CBText>
                        <CBText style={[appStyles.subtext, {color: colors.primaryTextColor}]}>{'VIC'}</CBText>
                    </CBView>
                </CBView>
                <CBView style={[appStyles.row, {flex: 1, justifyContent: 'flex-end'}]}>
                    <CBText style={[appStyles.subtext, {fontFamily: 'GoogleSans-Medium'}]}>{capitalizeFirstLetter(item.method)}</CBText>
                </CBView>
                <CBView style={{alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end'}}>
                    <CBText style={[appStyles.text, {fontSize: dimens.normalText, color: isPlus ? colors.greenContent : colors.redContent, fontFamily: 'GoogleSans-Medium'}]}>{`${isPlus ? '+' : '-'}${parseFloat(item.value) / Math.pow(10, 18)}VIC`}</CBText>
                    <CBText style={[appStyles.subtext, {fontSize: dimens.smallText, color: colors.primaryTextColor, marginLeft: 5}]}>{formattedDate}</CBText>
                </CBView>
            </CBView>
        )
    }

    return (
        <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_4')}>
            <CBHeader containerStyle={{backgroundColor: 'transparent', borderBottomWidth: 0}} leftComponent={renderLeftHeader()} rightComponent={renderRightHeader()}/>
            {renderBalance()}
            {renderTransaction()}
            <CreateUsernamePopup ref={createUsernamePopup} onCreateUser={onCreateUser}/>
        </CBImageBackground>
    );
});

export default BalanceContent;
