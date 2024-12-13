import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CBIcon, CBImage, CBTouchableOpacity, CBText, CBView, CBBadge} from 'components';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from 'configs/dimens';

import Balance from 'screens/mienpv/home/balance/Balance';
import MainEvent from 'screens/mienpv/home/MainEvent';
import Menu from 'screens/mienpv/home/Menu';
import ImageUtil from "utils/ImageUtil";
import {strings} from "controls/i18n";

const Tab = createBottomTabNavigator();
const Home = () => {
    const scheme = useColorScheme();
    const shadowStyle = helpers('shadow', scheme);
    const backgroundColor = helpers('background', scheme);
    const primaryColor = helpers('primary', scheme);
    const iconColor = helpers('icon', scheme);
    const renderTabBarIcon = (name, title) => ({focused}) => {
        return (
            <>
                <CBView style={[{position: 'absolute', top: 10}, {width: 90, alignItems: 'center'}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={name} color={focused ? primaryColor : iconColor} size={22}/>
                    <CBText style={[appStyles.text, {fontSize: 12, color: focused ? primaryColor : iconColor, marginTop: 2}]} define={'none'} allowFontScaling={false}>{title}</CBText>
                </CBView>
                {/*{name === 'notifications-outline' && count > 0 ? <CBBadge containerStyle={{position: 'absolute', top: 10, right: 10}} value={count > 99 ? '99+' : count} status={'error'}/> : null}*/}
            </>
        );
    };
    const renderCenterTabBarIcon = (name) => ({focused}) => {
        return (
            <CBTouchableOpacity style={[{position: 'absolute', top: 7.5}, {width: 45, height: 45, borderRadius: 22.5, backgroundColor: primaryColor}, {alignItems: 'center', justifyContent: 'center'}]} define={'none'}>
                <CBIcon type={'ionicon'} name={name} size={25} color={'#FFFFFF'}/>
            </CBTouchableOpacity>
        );
    };
    return (
        <Tab.Navigator
            initialRouteName={'Balance'}
            screenOptions={{
                lazy: true,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [appStyles.shadow, shadowStyle, {
                    position: 'absolute',
                    bottom: dimens.bottomSpace,
                    height: 70,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    marginHorizontal: 15,
                    paddingHorizontal: 15,
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, 0.8 )',
                }]
            }}>
            <Tab.Screen name={'Balance'} component={Balance} options={{headerShown: false, tabBarIcon: renderTabBarIcon('home-outline', strings('screen_home'))}}/>
            <Tab.Screen name={'MainEvent'} component={MainEvent} options={{headerShown: false, tabBarIcon: renderTabBarIcon('home-outline', strings('screen_home'))}}/>
            <Tab.Screen name={'Menu'} component={Menu} options={{headerShown: false, tabBarIcon: renderTabBarIcon('home-outline', strings('screen_home'))}}/>
        </Tab.Navigator>
    );
};

export default Home;
