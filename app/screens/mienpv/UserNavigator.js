import React from 'react';
import {Platform, useColorScheme, View} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';

import Home from 'screens/mienpv/home/Home';
import LoginOrRegister from "screens/mienpv/auth/LoginOrRegister";
import Web from 'screens/Web';
import Empty from 'screens/Empty';

const Stack = createStackNavigator();
export const UserStack = () => {
    const scheme = useColorScheme();
    const textColor = scheme === 'dark' ? colors.primaryTextDarkColor : colors.primaryTextColor;
    const renderHeaderBackImage = (props) => {
        if (Platform.OS === 'android') {
            return <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>;
        } else {
            return (
                <View style={[appStyles.action, {marginLeft: 5}]}>
                    <Ionicons name={'chevron-back-outline'} color={props.tintColor} size={25}/>
                </View>
            );
        }
    };
    return (
        <Stack.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerBackImage: renderHeaderBackImage,
                headerBackTitleVisible: false,
                headerTitleAllowFontScaling: false,
                headerBackAllowFontScaling: false,
                headerTitleAlign: 'center',
                headerTintColor: textColor,
                headerTitleStyle: {
                    fontSize: dimens.largeText,
                    fontFamily: 'GoogleSans-Regular'
                }
            }}>
            <Stack.Screen name={'Home'} component={Home} options={{headerShown: false}}/>
            <Stack.Screen name={'LoginOrRegister'} component={LoginOrRegister} options={{...TransitionPresets.ModalSlideFromBottomIOS, headerShown: false, gestureEnabled: false}}/>
            <Stack.Screen name={'Web'} component={Web} options={{title: strings('screen_web')}}/>
            <Stack.Screen name={'Empty'} component={Empty} options={{title: strings('screen_empty')}}/>
        </Stack.Navigator>
    );
};
