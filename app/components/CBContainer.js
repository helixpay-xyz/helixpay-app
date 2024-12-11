import React, {forwardRef} from 'react';
import {KeyboardAvoidingView, Platform, SafeAreaView, View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBContainer = ({style, children, removeIOS = false, keyboardVerticalOffset = 0}, ref) => {
    const {theme} = useTheme();
    const containerStyle = helpers('container', theme.colors.scheme);
    const contentStyle = helpers('content', theme.colors.scheme);
    return (
        <SafeAreaView ref={ref} style={[appStyles.container, containerStyle]}>
            {!removeIOS && Platform.OS === 'ios' ? <KeyboardAvoidingView style={{flex: 1}} keyboardVerticalOffset={keyboardVerticalOffset} behavior={'padding'}>
                <View style={[appStyles.content, style, contentStyle]}>
                    {children}
                </View>
            </KeyboardAvoidingView> :
            <View style={[appStyles.content, style, contentStyle]}>
                {children}
            </View>}
        </SafeAreaView>
    );
};

export default forwardRef(CBContainer);
