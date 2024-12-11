import React, {Component} from 'react';
import {Appearance, AppState, Dimensions, Linking, LogBox, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CBCache from 'caches/CBCache';
import CBConfig from 'configs/CBConfig';
import ConfigManager from 'controls/ConfigManager';
import CBGlobal from 'globals/CBGlobal';
import CBNotificationHandler from 'handlers/CBNotificationHandler';
import CBDeeplinkHandler from 'handlers/CBDeeplinkHandler';
import CBNative from 'modules/CBNative';
import CBRun from 'services/CBRun';
import ImageUtil from 'utils/ImageUtil';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {setJSExceptionHandler, setNativeExceptionHandler} from 'react-native-exception-handler';
import CodePush from 'react-native-code-push';
import {LocaleConfig} from 'react-native-calendars';
import analytics from '@react-native-firebase/analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation';
import {ModalPortal} from 'react-native-modals';
import DeviceInfo from 'react-native-device-info';
import {OneSignal} from 'react-native-onesignal';
import Parse from 'parse/react-native.js';
import {helpers} from 'configs/themes';
import {strings} from 'controls/i18n';
import colors from 'configs/colors';
import dimens from 'configs/dimens';
import {configure} from 'mobx';
import {configurePersistable} from 'mobx-persist-store';

import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './DropdownAlertHolder';
import DialogAlert from './DialogAlert';
import DialogAlertHolder from './DialogAlertHolder';

import {RootStack} from './Router';

const errorHandler = (e, isFatal) => {
    if (isFatal) {
        DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
    } else {
        console.log(e);
    }
};

setJSExceptionHandler(errorHandler, !__DEV__);

setNativeExceptionHandler((errorString) => {
    DialogAlertHolder.alert(strings('title_alert_crash'), strings('message_alert_crash'));
});

LocaleConfig.locales['en'] = {
    monthNames: ['January -', 'February -', 'March -', 'April -', 'May -', 'June -', 'July -', 'August -', 'September -', 'October -', 'November -', 'December -'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 01 /', 'Tháng 02 /', 'Tháng 03 /', 'Tháng 04 /', 'Tháng 05 /', 'Tháng 06 /', 'Tháng 07 /', 'Tháng 08 /', 'Tháng 09 /', 'Tháng 10 /', 'Tháng 11 /', 'Tháng 12 /'],
    monthNamesShort: ['Th01', 'Th02', 'Th03', 'Th04', 'Th05', 'Th06', 'Th07', 'Th08', 'Th09', 'Th10', 'Th11', 'Th12'],
    dayNames: ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
};

LogBox.ignoreAllLogs(__DEV__);
/*LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
]);*/

configure({
    enforceActions: 'never'
});

configurePersistable({
    storage: AsyncStorage
}, {
    delay: 1000
});

export default class App extends Component {

    constructor(props) {
        super(props);
        Parse.setAsyncStorage(AsyncStorage);
        Parse.initialize(CBConfig.BACK_4_APP_APPLICATION_ID, CBConfig.BACK_4_APP_JAVASCRIPT_KEY);
        Parse.serverURL = CBConfig.BACK_4_APP_URL;
        this.navigationRef = React.createRef();
        this.routeNameRef = React.createRef();
        this.state = {
            theme: Appearance.getColorScheme(),
            appState: AppState.currentState,
            isSubscribed: false
        };
    }

    componentDidMount() {
        ConfigManager.execute();
        Promise.all([DeviceInfo.getUniqueId(), DeviceInfo.getDeviceName(), DeviceInfo.getManufacturer(), DeviceInfo.isEmulator(), DeviceInfo.getTotalMemory(), CodePush.getUpdateMetadata()]).then(values => {
            CBCache.brand = DeviceInfo.getBrand();
            CBCache.systemVersion = DeviceInfo.getSystemVersion();
            CBCache.uniqueId = values[0] || '';
            CBCache.deviceId = encodeURIComponent(DeviceInfo.getDeviceId() || '');
            CBCache.deviceName = encodeURIComponent(values[1] || '');
            CBCache.manufacturer = encodeURIComponent(values[2] || '');
            CBCache.isEmulator = values[3] || false;
            CBCache.totalMemory = Math.floor(values[4] / 1000000000);
            CBCache.codePushVersion = values[5]?.label || CBNative.buildVersion;
        });

        this.dimensionsSubscription = Dimensions.addEventListener('change', this.handleAppWindowChange);

        this.unsubscribeNetwork = NetInfo.addEventListener(this.handleConnectivityChange);

        this.appStateSubscription = AppState.addEventListener('change', this.handleAppStateChange);

        this.linkingSubscription = Linking.addEventListener('url', this.handleOpenUrl);
        Linking.getInitialURL().then((url) => {
            CBDeeplinkHandler.handleUrl(url);
        }).catch((error) => console.error('An error occurred', error));

        this.unsubscribeDynamicLinks = dynamicLinks().onLink(this.handleOpenDynamicUrl);
        dynamicLinks().getInitialLink().then((link) => {
            CBDeeplinkHandler.handleDynamicUrl(link?.url);
        }).catch((error) => console.error('An error occurred', error));

        messaging().onNotificationOpenedApp(remoteMessage => {
            const {data} = remoteMessage || {};
            CBNotificationHandler.onClick(null, data);
        });
        messaging().getInitialNotification().then(remoteMessage => {
            const {data} = remoteMessage || {};
            if (data) CBGlobal.appNotification = data;
        });
        this.unsubscribeMessaging = messaging().onMessage(async (remoteMessage) => {
            const {messageId, notification, data} = remoteMessage || {};
            const {title, body} = notification || {};
            CBNotificationHandler.onReceived(null, messageId, title, body, data);
        });

        notifee.getInitialNotification().then(initialNotification => {
            const {notification} = initialNotification || {};
            const {data} = notification || {};
            if (data) CBGlobal.appNotification = data;
        });
        this.unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
            const {notification} = detail || {};
            const {data} = notification || {};
            switch (type) {
                case EventType.PRESS:
                    CBNotificationHandler.onClick(null, data);
                    break;
                default:
                    break;
            }
        });

        OneSignal.initialize(CBConfig.ONE_SIGNAL_APP_ID);
        //OneSignal.Notifications.requestPermission(true);
        OneSignal.Notifications.addEventListener('foregroundWillDisplay', this.onReceived);
        OneSignal.Notifications.addEventListener('click', this.onOpened);
        (async () => {
            const id = await OneSignal.User.pushSubscription.getPushSubscriptionId();
            const token = await OneSignal.User.pushSubscription.getPushSubscriptionToken();
            if (token) await AsyncStorage.setItem('@os_token', token);
            const appTheme = await AsyncStorage.getItem('@user_theme');
            this.setState({
                theme: appTheme || Appearance.getColorScheme(),
                isSubscribed: !!id
            }, this.onLoaded);
        })();
    }

    componentWillUnmount() {
        this.dimensionsSubscription.remove();

        if (this.unsubscribeNetwork) this.unsubscribeNetwork();

        this.appStateSubscription.remove();

        this.linkingSubscription.remove();

        if (this.unsubscribeDynamicLinks) this.unsubscribeDynamicLinks();

        if (this.unsubscribeMessaging) this.unsubscribeMessaging();

        if (this.unsubscribeNotifee) this.unsubscribeNotifee();
    }

    handleAppWindowChange = ({window}) => {
        if (dimens.widthScreen !== window.width || dimens.heightScreen !== window.height) {
            CodePush.restartApp();
        }
    };

    handleConnectivityChange = (state) => {
        CBCache.ipAddress = state?.details?.ipAddress;
        const {appState: action} = this.state;
        if (action === 'active') {
            const {isConnected} = state;
            if (!isConnected) {
                DropdownAlertHolder.alertWithType('error', strings('title_alert_no_internet'), strings('message_alert_no_internet'));
            }
        }
    };

    handleAppStateChange = async (state) => {
        this.setState({appState: state});
    };

    handleOpenUrl = (event) => {
        CBDeeplinkHandler.handleUrl(event?.url);
    };

    handleOpenDynamicUrl = (link) => {
        CBDeeplinkHandler.handleDynamicUrl(link?.url);
    };

    onReceived = ({notification}) => {
        const notificationId = notification?.notificationId;
        const title = notification?.title;
        const body = notification?.body;
        const data = notification?.additionalData;
        CBNotificationHandler.onReceived(null, notificationId, title, body, data);
    };

    onOpened = ({notification}) => {
        const data = notification?.additionalData;
        CBNotificationHandler.onClick(null, data);
    };

    onLoaded = () => {
        SplashScreen.hide();
        Orientation.lockToPortrait();
    };

    onReady = () => {
        this.routeNameRef.current = this.navigationRef.current.getCurrentRoute().name;
    };

    onStateChange = async () => {
        const previousRouteName = this.routeNameRef.current;
        const currentRouteName = this.navigationRef.current.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName &&  !__DEV__) {
            await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName
            });
        }
        this.routeNameRef.current = currentRouteName;
    };

    onDismissPress = () => {
        CBRun.runCheckNotification();
    };

    render() {
        const {theme} = this.state;
        const isDarkMode = theme === 'dark';
        const barStyle = isDarkMode ? 'light-content' : 'dark-content';
        const statusBarColor = isDarkMode ? colors.statusBarDarkColor : colors.statusBarColor;
        const backgroundColor = isDarkMode ? colors.primaryDarkColor : colors.primaryColor;
        return (
            <ThemeProvider theme={helpers('elements', theme)}>
                <StatusBar barStyle={barStyle} backgroundColor={statusBarColor}/>
                <GestureHandlerRootView style={{flex: 1}}>
                    <NavigationContainer ref={this.navigationRef} onReady={this.onReady} onStateChange={this.onStateChange} theme={helpers('navigation', theme)} initialRouteName={'Home'}>
                        <RootStack/>
                    </NavigationContainer>
                </GestureHandlerRootView>
                <DropdownAlert
                    alert={func => DropdownAlertHolder.setAlertFunc(func)}
                    animatedViewStyle={{backgroundColor}}
                    inactiveStatusBarStyle={barStyle}
                    inactiveStatusBarBackgroundColor={statusBarColor}
                    imageStyle={{width: 25, height: 25, tintColor: '#FFFFFF'}}
                    cancelImageStyle={{width: 25, height: 25, tintColor: '#FFFFFF'}}
                    infoImageSrc={ImageUtil.getImage('ic_info_circle')}
                    warnImageSrc={ImageUtil.getImage('ic_exclamation_triangle')}
                    errorImageSrc={ImageUtil.getImage('ic_exclamation_circle')}
                    successImageSrc={ImageUtil.getImage('ic_check_circle')}
                    cancelImageSrc={ImageUtil.getImage('ic_times')}
                    onDismissPress={this.onDismissPress}
                />
                <DialogAlert ref={ref => DialogAlertHolder.setDialogAlert(ref)} theme={theme}/>
                <ModalPortal/>
            </ThemeProvider>
        );
    }
}
