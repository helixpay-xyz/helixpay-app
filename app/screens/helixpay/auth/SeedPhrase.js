import React, {useState, useEffect, useRef, useContext, useMemo} from 'react';
import { Keyboard } from 'react-native';
import {
    CBButton,
    CBDivider, CBIcon,
    CBImageBackground,
    CBInput, CBRefreshControl,
    CBText, CBTouchableOpacity,
    CBTouchableWithoutFeedback,
    CBView,
    CBScrollView,
} from 'components';
import Clipboard from '@react-native-clipboard/clipboard';
import { generateMnemonic } from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { appStyles } from 'configs/styles';
import { strings } from 'controls/i18n';
import dimens from 'configs/dimens';
import ImageUtil from 'utils/ImageUtil';
import { FlashList } from '@shopify/flash-list';
import colors from 'configs/colors';
import Toast from "react-native-simple-toast";
import RootNavigation from "screens/RootNavigation";
import EventTracker from "controls/EventTracker";

const SeedPhrase = () => {

    const [index, setIndex] = useState(0);

    const seedPhraseArray = useMemo(() => {
        const generatedMnemonic = generateMnemonic(wordlist);
        return generatedMnemonic.split(' ');
    }, []);


    const onBlur = () => {
        Keyboard.dismiss();
    };

    const onIndexChange = (index) => () => {
        setIndex(index);
    }

    const copyToClipboard = () => {
        Clipboard.setString(seedPhraseArray.join(' '));
        Toast.show(strings('text_copied_to_clipboard'), Toast.LONG);
    };

    const onClose = () => {
        RootNavigation.goBack();
    };

    const renderItem = ({ item, index }) => (
        <CBView key={index} style={{width: dimens.widthScreen / 2 - 30, flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)'}}>
            <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white, flex: 1 }]} define={'text'}>
                {index + 1}. {item}
            </CBText>
        </CBView>
    );

    const renderListSeedPhrase = () => {
        return seedPhraseArray.map((item, index) => {
            return (
                <CBView key={index} style={{paddingHorizontal: 10, paddingVertical: 10, margin: 5, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, flexShrink: 1, height: 45}}>
                    <CBText style={[appStyles.text, {textAlign: 'center', color: colors.white, flex: 1 }]} define={'text'}>
                        {item}
                    </CBText>
                </CBView>
            );
        });
    }

    const renderSeparator = () => {
        return <CBView style={{height: 15}} define={'none'}/>;
    };

    return (
        <CBImageBackground style={{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start',}} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen,}} source={ImageUtil.getImage('background_1')}>
            <CBView style={{ paddingHorizontal: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar,}}>
                <CBText style={[appStyles.heading, { marginTop: 60 }]} define={'heading'}>
                    {index === 0 ? strings('text_secret_recovery_word') : strings('text_confirm_recovery_word')}
                </CBText>
                <CBText style={[appStyles.subtext, { marginTop: 5 }]} define={'subtext'}>
                    {index === 0 ? strings('text_subtitle_srw') : strings('text_subtitle_confirm_recovery_word')}
                </CBText>
                <CBTouchableOpacity style={[appStyles.action, {position: 'absolute', top: 10, left: 10}]} define={'none'} onPress={index === 0 ? onClose : onIndexChange(0)}>
                    <CBIcon define={'icon'} type={'ionicon'} name={index === 0 ? 'close-outline' : 'arrow-back-circle-outline'} size={30}/>
                </CBTouchableOpacity>
            </CBView>
            <CBTouchableWithoutFeedback define={'none'} onPress={onBlur}>
                <CBScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}>
                <CBView style={{paddingVertical: 15, paddingHorizontal: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
                    <FlashList
                        contentContainerStyle={{paddingTop: 30}}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode={'on-drag'}
                        keyboardShouldPersistTaps={'always'}
                        estimatedItemSize={12}
                        data={seedPhraseArray}
                        numColumns={2}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    />
                    {index === 1 ? <CBView style={[appStyles.row, {flexWrap: 'wrap', justifyContent: 'flex-start', marginRight: 15}]}>
                        {renderListSeedPhrase()}
                    </CBView> : null}
                </CBView>
            </CBScrollView>
            </CBTouchableWithoutFeedback>
            {index === 0 ? <CBTouchableOpacity style={{padding: 15}} onPress={copyToClipboard}>
                <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white,}]} define={'text'}>
                    {strings('text_copy_to_clipboard')}
                </CBText>
            </CBTouchableOpacity> : null}
            <CBButton containerStyle={{ marginTop: 15, marginBottom: 45, marginHorizontal: 15 }} buttonStyle={appStyles.button} title={strings('text_confirm_copy')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor }]} onPress={onIndexChange(1)}/>
        </CBImageBackground>
    );
};

export default SeedPhrase;
