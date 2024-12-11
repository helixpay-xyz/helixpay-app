import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import HTMLView from 'react-native-htmlview';
import {Icon, useTheme} from 'react-native-elements';
import Modal from 'react-native-modal';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBActionSheet = ({style, onAction}, ref) => {
    useImperativeHandle(ref, () => ({
        show,
        hide
    }));
    const [data, setData] = useState({});
    const [visible, setVisible] = useStateWithCallbackLazy(false);
    const {title = '', buttons = [], options = {}} = data;
    const swipeDirection = options && (options.cancelable === true || options.cancelable === undefined) ? ['down'] : null;
    const show = (data) => {
        Keyboard.dismiss();
        setData(data);
        setVisible(true);
    };
    const hide = (callback) => {
        setVisible(false, fallback(callback));
    };
    const fallback = (callback) => () => {
        if (callback) setTimeout(callback, 300);
    };
    const onDismiss = () => {
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
    const onSwipeOut = () => {
        hide();
    };
    const onPress = (index) => () => {
        const button = buttons[index];
        if (button && button.onPress && typeof button.onPress === 'function') {
            hide(button.onPress);
        } else if (button && button.refId) {
            hide(() => CBControl.navigateWith(button.refId, button.defaultParam, button.injection));
        } else if (button && button.name) {
            if (onAction && typeof onAction === 'function') {
                hide(onAction(button.name));
            } else {
                hide();
            }
        } else {
            hide();
        }
        if (button && button.tracking) {
            EventTracker.logEvent('cb_action_sheet', {action: `click_button_${button.tracking}`});
        }
    };
    const {theme} = useTheme();
    const knobStyle = helpers('knob', theme.colors.scheme);
    const sheetStyle = helpers('sheet', theme.colors.scheme);
    const labelStyle = helpers('label', theme.colors.scheme);
    const dividerStyle = helpers('divider', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    const subtextStyle = helpers('subtext', theme.colors.scheme);
    const htmlStyles = helpers('html', theme.colors.scheme);
    return (
        <Modal
            style={appStyles.modal}
            isVisible={visible}
            backdropOpacity={0.5}
            backdropTransitionOutTiming={0}
            propagateSwipe={true}
            onModalHide={onDismiss}
            onBackdropPress={onTouchOutside}
            onBackButtonPress={onHardwareBackPress}
            onSwipeComplete={onSwipeOut}
            swipeDirection={swipeDirection}>
            <View style={[appStyles.knob, {alignSelf: 'center'}, knobStyle]}/>
            <View style={[appStyles.sheet, {height: 266}, style, sheetStyle]}>
                {title ? <Text style={[appStyles.label, {margin: 15}, labelStyle]} numberOfLines={1} ellipsizeMode={'tail'}>{title}</Text> : null}
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    {buttons.map((i, k) => <TouchableOpacity key={k} style={[appStyles.item, i.itemStyle, k > 0 ? appStyles.divider : {}, dividerStyle]} onPress={onPress(k)}>
                        {i.icon ? i.icon : <Icon type={i.type} name={i.name} color={i.color} size={i.size}/>}
                        <View style={{flex: 1, marginLeft: 15, marginRight: i.selectedIcon ? 15 : 0}}>
                            {i.text ? <Text style={[appStyles.text, textStyle, i.textStyle]}>{i.text}</Text> : null}
                            {i.subtext ? <Text style={[appStyles.subtext, subtextStyle, i.subtextStyle]}>{i.subtext}</Text> : null}
                            {i.html ? <HTMLView
                                stylesheet={htmlStyles}
                                textComponentProps={{style: [htmlStyles.p, {textAlign: 'left'}]}}
                                value={i.html}
                            /> : null}
                        </View>
                        {i.selectedIcon ? i.selectedIcon : null}
                    </TouchableOpacity>)}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default forwardRef(CBActionSheet);
