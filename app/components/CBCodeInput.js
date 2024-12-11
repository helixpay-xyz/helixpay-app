import React, {forwardRef, useEffect} from 'react';
import {Platform, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {getHash, removeListener, startOtpListener} from 'react-native-otp-verify';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const majorVersionIOS = parseInt(Platform.Version, 10);
const isOTPSupported = Platform.OS === 'ios' && majorVersionIOS >= 12;

const CBCodeInput = ({containerStyle, inputStyle, autoFocus, count, value, errorMessage, onChangeCode, onFocusCode, onFillCode}, ref) => {
    const fields = [];
    useEffect(() => {
        if (Platform.OS === 'android') {
            getHash().then((hash) => {
                console.log('dctan :: ', JSON.stringify(hash));
            }).catch((error) => console.error('An error occurred', error));
            startOtpListener(message => {
                const array = message.match(/[0-9]+/g);
                for (const item of array) {
                    if (item.length === count) {
                        if (onChangeCode && typeof onChangeCode === 'function') {
                            onChangeCode(item);
                        }
                        if (onFillCode && typeof onFillCode === 'function') {
                            setTimeout(() => onFillCode(item), 300);
                        }
                    }
                }
            }).catch((error) => console.error('An error occurred', error));
            return () => removeListener();
        }
    }, []);
    const onFocus = (k) => {
        if (fields && Array.isArray(fields) && fields[k]) {
            if (Platform.OS === 'android') fields[k].blur(); // Hot fix android
            fields[k].focus();
        }
    };
    const onBlur = () => {
        if (fields && Array.isArray(fields)) {
            for (const field of fields) {
                field.blur();
            }
        }
    };
    const onPress = () => {
        const digits = Array.from(value || '').filter(digit => !!digit);
        onFocus(Math.min(digits.length, count - 1));
    };
    const onChangeText = (k) => (digit) => {
        let digits = Array.from(value || '').slice();
        const oldLength = digits[k] ? digits[k].length : 0;
        const newLength = digit.length;
        if (newLength - oldLength >= count) {
            digits = Array.from(digit || '').slice(oldLength, newLength);
            if (onChangeCode && typeof onChangeCode === 'function') {
                onChangeCode(digits.join('').slice(0, count));
            }
        } else {
            if (digit.length === 0) {
                if (digits.length > 0) {
                    digits = digits.slice(0, digits.length - 1);
                }
            } else {
                Array.from(digit || '').forEach(value => {
                    digits[k] = value;
                    k += 1;
                });
                k -= 1;
            }
            if (onChangeCode && typeof onChangeCode === 'function') {
                onChangeCode(digits.join('').slice(0, count));
            }
        }
        const result = digits.join('');
        if (result.length >= count) {
            onBlur();
            if (onFillCode && typeof onFillCode === 'function') {
                setTimeout(() => onFillCode(result.slice(0, count)), 300);
            }
        } else {
            if (digit.length === 0 && k > 0) {
                onFocus(k - 1);
            }
            if (digit.length > 0 && k < count - 1) {
                onFocus(k + 1);
            }
        }
    };
    const onPivot = (k) => () => {
        if (onFocusCode && typeof onFocusCode === 'function') {
            onFocusCode(k);
        }
    };
    const onKeyPress = (k) => (e) => {
        const {nativeEvent: {key}} = e;
        if (key === 'Backspace') {
            if (!Array.from(value || '')[k] && k > 0) {
                onChangeText(k - 1, '');
                onFocus(k - 1);
            }
        }
    };
    const {theme} = useTheme();
    const primaryColor = helpers('primary', theme.colors.scheme);
    const codeStyle = helpers('code', theme.colors.scheme);
    const errorStyle = helpers('error', theme.colors.scheme);
    return (
        <View ref={ref} style={containerStyle}>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[appStyles.row, {justifyContent: 'space-between'}]}>
                    {new Array(count).fill(1).map((i, k) => <View key={k} pointerEvents={'none'}>
                        <TextInput
                            style={[appStyles.code, codeStyle, inputStyle]}
                            ref={ref => fields[k] = ref}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            keyboardType={'number-pad'}
                            autoCapitalize={'none'}
                            autoFocus={autoFocus && k < 1}
                            autoComplete={'sms-otp'}
                            textContentType={isOTPSupported ? 'oneTimeCode' : 'none'}
                            value={Array.from(value || '')[k]}
                            onChangeText={onChangeText(k)}
                            onFocus={onPivot(k)}
                            onKeyPress={onKeyPress(k)}
                        />
                        <View style={{height: 2, backgroundColor: primaryColor, borderRadius: 1, marginHorizontal: 15}}/>
                    </View>)}
                </View>
            </TouchableWithoutFeedback>
            <Text style={[appStyles.error, {margin: 5}, errorStyle]}>{errorMessage}</Text>
        </View>
    );
};

export default forwardRef(CBCodeInput);
