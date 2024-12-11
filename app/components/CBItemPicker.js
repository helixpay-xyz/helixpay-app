import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {FlatList, Keyboard, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Icon, Input, useTheme} from 'react-native-elements';
import Modal from 'react-native-modal';
import {removeAlias} from 'utils/LanguageUtil';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

const CBItemPicker = ({style, value, onPicked}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [delta, setDelta] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', placeholder = '', source = [], map = {}, renderText = () => {}, renderSubtext = () => {}, options = {}, count = 1} = data;
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const keyboardDidShow = (e) => {
        setDelta(e.endCoordinates.height + dimens.statusBar + (options && (options.cancelable === true || options.cancelable === undefined) ? 50 : 0));
    };
    const keyboardDidHide = (e) => {
        setDelta(0);
    };
    const init = () => {
        const initData = source[0];
        if (!value && initData) {
            if (onPicked && typeof onPicked === 'function') {
                onPicked(initData);
            }
        }
    };
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true, data && data.options && data.options.init ? init : () => {});
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const fallback = (callback) => () => {
        if (callback) setTimeout(callback, 300);
    };
    const onDismiss = () => {
        setKeyword('');
        if (options && options.onDismiss && typeof options.onDismiss === 'function') {
            options.onDismiss();
        }
    };
    const onTouchOutside = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
    };
    const onHardwareBackPress = () => {
        if (options && (options.cancelable === true || options.cancelable === undefined)) {
            hide();
        }
        return true;
    };
    const onClose = () => {
        hide();
    };
    const onChangeKeyword = (keyword) => {
        setKeyword(keyword);
    };
    const onClearKeyword = () => onChangeKeyword('');
    const onPress = (item) => () => {
        if (count > 1) {
            if (onPicked && typeof onPicked === 'function') {
                if (map && map.value && value && Array.isArray(value)) {
                    if (value.length < count && !value.some(i => i[map.value] === item[map.value])) {
                        if (value.length + 1 === count) {
                            hide(() => {
                                onPicked([...value, item]);
                            });
                        } else {
                            onPicked([...value, item]);
                        }
                    } else {
                        onPicked(value.filter(i => i[map.value] !== item[map.value]));
                    }
                }
            }
        } else {
            hide(() => {
                if (onPicked && typeof onPicked === 'function') {
                    onPicked(item);
                }
            });
        }
    };
    const {theme} = useTheme();
    const backgroundColor = helpers('background', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const labelStyle = helpers('label', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const subtextStyle = helpers('subtext', theme.colors.scheme);
    const primaryColor = helpers('primary', theme.colors.scheme);
    const separatorStyle = helpers('separator', theme.colors.scheme);
    const percent = dimens.heightScreen >= 1.8 * dimens.widthScreen ? (0.55 + Platform.select({android: 0.02, ios: 0})) : 0.65;
    const height = delta > 0 ? dimens.heightScreen - delta : percent * dimens.heightScreen;
    const filterSource = (source) => {
        if (map && (map.text || map.subtext) && !!keyword) {
            return source.filter(i => {
                const text = removeAlias(i[map.text]).toLowerCase();
                const subtext = removeAlias(i[map.subtext]).toLowerCase();
                const pattern = removeAlias(keyword).toLowerCase();
                return keyword.length < 2 ? (text.startsWith(pattern) || subtext.startsWith(pattern)) : (text.indexOf(pattern) > -1 || subtext.indexOf(pattern) > -1);
            });
        }
        return source;
    };
    const getText = (item) => {
        const text = renderText(item);
        if (!!text) {
            return <Text style={[appStyles.text, textStyle]}>{text}</Text>;
        } else if (map && map.text && item[map.text]) {
            return <Text style={[appStyles.text, textStyle]}>{item[map.text]}</Text>;
        } else {
            return null;
        }
    };
    const getSubtext = (item) => {
        const subtext = renderSubtext(item);
        if (!!subtext) {
            return <Text style={[appStyles.subtext, subtextStyle]}>{subtext}</Text>;
        } else if (map && map.subtext && item[map.subtext]) {
            return <Text style={[appStyles.subtext, subtextStyle]}>{item[map.subtext]}</Text>;
        } else {
            return null;
        }
    };
    const getValue = (item) => {
        if (map && map.value) {
            if (value && ((count > 1 && Array.isArray(value) && value.some(i => i[map.value] === item[map.value])) || value[map.value] === item[map.value])) {
                return <Icon type={'ionicon'} name={'checkmark-circle-outline'} color={primaryColor} size={25}/>;
            } else {
                return <Icon type={'ionicon'} name={'ellipse-outline'} color={backgroundColor} size={25}/>;
            }
        } else {
            return null;
        }
    };
    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity key={index} style={appStyles.item} onPress={onPress(item)}>
                <View style={{flex: 1, marginRight: 10}}>
                    {getText(item)}
                    {getSubtext(item)}
                </View>
                {getValue(item)}
            </TouchableOpacity>
        );
    };
    const renderSeparator = () => {
        return <View style={[appStyles.separator, {marginHorizontal: 15}, separatorStyle]}/>;
    };
    const keyExtractor = (item, index) => String(item?.id || index);
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            avoidKeyboard={true}>
            {options && (options.cancelable === true || options.cancelable === undefined) ? <TouchableOpacity style={[appStyles.action, {backgroundColor: backgroundColor, borderRadius: 20, margin: 10}]} onPress={onClose}>
                <Icon type={'ionicon'} name={'close-outline'} color={iconColor} size={25}/>
            </TouchableOpacity> : null}
            <View style={[appStyles.sheet, {height: height}, style, sheetStyle]}>
                <Text style={[appStyles.label, {textAlign: 'center', margin: 15}, labelStyle]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text>
                <View style={{marginTop: 0, marginBottom: 10, marginHorizontal: 15}}>
                    <Input
                        containerStyle={{height: 40}}
                        leftIcon={
                            <View style={appStyles.action} define={'none'}>
                                <Icon define={'icon'} type={'ionicon'} color={iconColor} name={'search-outline'} size={20}/>
                            </View>
                        }
                        rightIcon={
                            !!keyword ? <TouchableOpacity style={appStyles.action} define={'none'} onPress={onClearKeyword}>
                                <Icon define={'icon'} type={'material-community'} color={iconColor} name={'close'} size={20}/>
                            </TouchableOpacity> : null
                        }
                        inputContainerStyle={{height: 40}}
                        inputStyle={{height: 40, paddingLeft: 0}}
                        errorStyle={{height: 0}}
                        placeholder={placeholder || strings('placeholder_keyword')}
                        returnKeyType={'search'}
                        autoCapitalize={'none'}
                        maxLength={256}
                        value={keyword}
                        onChangeText={onChangeKeyword}/>
                </View>
                <FlatList
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'always'}
                    data={filterSource(source)}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeparator}
                    keyExtractor={keyExtractor}
                />
            </View>
        </Modal>
    );
};

export default forwardRef(CBItemPicker);
