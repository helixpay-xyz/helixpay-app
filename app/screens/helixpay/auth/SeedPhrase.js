import React, {useState, useEffect, useRef, useContext, useMemo} from 'react';
import { Keyboard } from 'react-native';
import {
    CBDivider,
    CBImageBackground,
    CBInput,
    CBText, CBTouchableOpacity,
    CBTouchableWithoutFeedback,
    CBView,
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

const SeedPhrase = () => {

    const seedPhraseArray = useMemo(() => {
        const generatedMnemonic = generateMnemonic(wordlist);
        return generatedMnemonic.split(' ');
    }, []);


    const onBlur = () => {
        Keyboard.dismiss();
    };

    const copyToClipboard = () => {
        Clipboard.setString(seedPhraseArray.join(' '));
        Toast.show(strings('text_copied_to_clipboard'), Toast.LONG);
    };

    const renderItem = ({ item, index }) => (
        <CBView key={index} style={{width: dimens.widthScreen / 2 - 30, flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)'}}>
            <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white, flex: 1 }]} define={'text'}>
                {index + 1}. {item}
            </CBText>
        </CBView>
    );

    const renderSeparator = () => {
        return <CBView style={{height: 15}} define={'none'}/>;
    };

    return (
        <CBImageBackground style={{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start',}} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen,}} source={ImageUtil.getImage('background_1')}>
            <CBTouchableWithoutFeedback style={{ flex: 1 }} define={'none'} onPress={onBlur}>
                <CBView style={{flex: 1, paddingVertical: 15, paddingHorizontal: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: dimens.statusBar,}}>
                    <CBText style={[appStyles.heading, { marginTop: 60 }]} define={'heading'}>
                        {strings('text_secret_recovery_word')}
                    </CBText>
                    <CBText style={[appStyles.subtext, { marginTop: 5 }]} define={'subtext'}>
                        {strings('text_subtitle_srw')}
                    </CBText>
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
                    <CBTouchableOpacity style={{padding: 15, borderBottomLeftRadius: 30, borderBottomRightRadius: 30,}} onPress={copyToClipboard}>
                        <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white,}]} define={'text'}>
                            {strings('text_copy_to_clipboard')}
                        </CBText>
                    </CBTouchableOpacity>
                </CBView>
            </CBTouchableWithoutFeedback>
        </CBImageBackground>
    );
};

export default SeedPhrase;
