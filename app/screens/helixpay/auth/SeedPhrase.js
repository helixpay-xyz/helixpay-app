import React, {useState, useEffect, useRef, useContext, useMemo} from 'react';
import { Keyboard } from 'react-native';
import {CBButton,CBIcon, CBImageBackground, CBInput, CBText, CBTouchableOpacity, CBTouchableWithoutFeedback, CBView, CBScrollView,} from 'components';
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
import RootNavigation from 'screens/RootNavigation';
import AesGcmCrypto from 'react-native-aes-gcm-crypto';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { randomBytes } from 'react-native-randombytes';

const SeedPhrase = () => {

    const [index, setIndex] = useState(0);
    const [isMatch, setIsMatch] = useState(false);

    const seedPhraseArray = useMemo(() => {
        const generatedMnemonic = generateMnemonic(wordlist);
        // const testEncrypt = AesGcmCrypto.encrypt(generatedMnemonic, 'password');
        return generatedMnemonic.split(' ');
    }, []);

    const generateBase64Key = (password, randomBytes) => {
        const passwordBytes = [...password].map((char) => char.charCodeAt(0));

        const combinedBytes = passwordBytes.concat(randomBytes);

        if (combinedBytes.length > 32) {
            combinedBytes.length = 32;
        } else {
            while (combinedBytes.length < 32) {
                combinedBytes.push(0);
            }
        }
        const base64Key = Buffer.from(combinedBytes).toString('base64');

        return base64Key;
    }

    const encryptMnemonic = async () => {
        try {
            const password = '12345678A@f';
            const plaintext = seedPhraseArray.join(' ');
            const key = generateBase64Key(password, randomBytes(16));
            const encryptedSeedPhrase = await AesGcmCrypto.encrypt(plaintext, false, key);
            await AsyncStorage.setItem('encryptSeedPhrase', encryptedSeedPhrase);

        } catch (error) {
            console.error('Encryption failed:', error);
        }
    };

    const validationSchema = yup.object({
        seedPhrase: yup.string().trim()
            .matches(seedPhraseArray.join(' '), 'Not match')
    });

    const onBlur = () => {
        Keyboard.dismiss();
    };

    const onIndexChange = () => (index) => {
        if (index === 1) {
            encryptMnemonic();
        }
        setIndex(index);
    }

    const copyToClipboard = () => {
        Clipboard.setString(seedPhraseArray.join(' '));
        Toast.show(strings('text_copied_to_clipboard'), Toast.LONG);
    };

    const onClose = () => {
        RootNavigation.goBack();
    };

    const onConfirm = (values) => {
        const seedPhrase = seedPhraseArray.join(' ');
        if (values?.seedPhrase !== seedPhrase) {
            Toast.show('Not match', Toast.LONG);
        } else {
            Toast.show('Match', Toast.LONG);
        }
    }

    const onCheck = (values) => {
        const seedPhrase = seedPhraseArray.join(' ');
        if (values.seedPhrase === seedPhrase) {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    };

    const onToggleError = (setFieldError, name) => () => {
        setFieldError(name, '');
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
    };

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
                    {index === 0 ? <FlashList
                        contentContainerStyle={{paddingTop: 30}}
                        showsVerticalScrollIndicator={false}
                        keyboardDismissMode={'on-drag'}
                        keyboardShouldPersistTaps={'always'}
                        estimatedItemSize={12}
                        data={seedPhraseArray}
                        numColumns={2}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    />  : null}
                    {/*{index === 1 ? <CBView style={[appStyles.row, {flexWrap: 'wrap', justifyContent: 'flex-start', marginRight: 15}]}>*/}
                    {/*    /!*{renderListSeedPhrase()}*!/*/}
                    {/*    <DraggableFlatList*/}
                    {/*        data={data}*/}
                    {/*        onDragEnd={({ data }) => setData(data)}*/}
                    {/*        keyExtractor={(item) => item.key}*/}
                    {/*        renderItem={renderDragItem}*/}
                    {/*        contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap',}}*/}
                    {/*    />*/}
                    {/*</CBView> : null}*/}
                    {index === 1 ? <Formik
                        initialValues={{seedPhrase: ''}}
                        validationSchema={validationSchema}
                        validateOnChange={true}
                        validateOnBlur={false}
                        onSubmit={onConfirm}>
                        {
                            ({setFieldValue, setFieldError, handleChange, handleSubmit, values, errors}) => (
                                <>
                                    <CBInput
                                        containerStyle={{marginTop: 30, marginBottom: 0}}
                                        inputContainerStyle={{borderColor: !!values.seedPhrase ? colors.primaryColor : colors.grayColor}}
                                        placeholder={strings('placeholder_password')}
                                        returnKeyType={'go'}
                                        autoCapitalize={'none'}
                                        maxLength={300}
                                        value={values.seedPhrase}
                                        errorMessage={errors.seedPhrase}
                                        onChangeText={handleChange('seedPhrase')}
                                        onFocus={onToggleError(setFieldError, 'seedPhrase')}
                                        onSubmitEditing={handleSubmit}
                                    />
                                    <CBButton disabled={!values?.seedPhrase} containerStyle={{ marginTop: 15, }} buttonStyle={appStyles.button} title={strings('button_confirm')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor }]} onPress={handleSubmit}/>
                                    {/*{!!values?.seedPhrase ? <CBText style={[appStyles.caption, {marginTop: 5, color: isMatch ? colors.greenContent : colors.errorTextColor}]}>{isMatch ? 'Matching' : 'Not match'}</CBText> : null}*/}
                                </>
                            )
                        }
                    </Formik> : null}
                </CBView>
            </CBScrollView>
            </CBTouchableWithoutFeedback>
            {index === 0 ? <CBTouchableOpacity style={{padding: 15}} onPress={copyToClipboard}>
                <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white,}]} define={'text'}>
                    {strings('text_copy_to_clipboard')}
                </CBText>
            </CBTouchableOpacity> : null}
            {/*{index === 0 ? <CBTouchableOpacity style={{padding: 15}} onPress={encryptMnemonic}>*/}
            {/*    <CBText style={[appStyles.text, {textAlign: 'center', fontFamily: 'SpaceGrotesk-Bold', color: colors.white,}]} define={'text'}>*/}
            {/*        {'encrypt'}*/}
            {/*    </CBText>*/}
            {/*</CBTouchableOpacity> : null}*/}
            {index === 0 ?<CBButton containerStyle={{ marginTop: 15, marginBottom: 45, marginHorizontal: 15 }} buttonStyle={appStyles.button} title={strings('text_confirm_copy')} titleStyle={[appStyles.text, { fontFamily: 'SpaceGrotesk-Medium', color: colors.backgroundColor }]} onPress={onIndexChange(1)}/> : null}
        </CBImageBackground>
    );
};

export default SeedPhrase;
