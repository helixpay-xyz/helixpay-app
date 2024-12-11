import React, {useEffect} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {AppState, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CBAction, CBButton, CBText, CBView} from 'components';
import TimeUtil from 'utils/TimeUtil';
import {openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';

const NotificationReminder = ({style, type, name, color, size, message}) => {
    const [enable, setEnable] = useStateWithCallbackLazy(false);
    useEffect(() => {
        handleAppStateChange('active');
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, []);
    const handleAppStateChange = async (state) => {
        if (state === 'active') {
            const timing = await AsyncStorage.getItem('@app_timing_notification');
            const hasPermission = await messaging().hasPermission();
            setEnable(TimeUtil.getCurrentUnix() - Number(timing) >= 3 * 86400 && !hasPermission);
        }
    };
    const onSkip = () => {
        setEnable(false, async () => await AsyncStorage.setItem('@app_timing_notification', String(TimeUtil.getCurrentUnix())));
    };
    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            if (result === RESULTS.GRANTED) {
                grantedPermission();
            } else {
                deniedPermission();
            }
        } else {
            deniedPermission();
        }
    };
    const grantedPermission = () => {
        setEnable(false);
    };
    const deniedPermission = () => {
        openSettings().catch(() => console.log('Cannot open settings.'));
    };
    return enable && (
        <CBView style={style} define={'none'}>
            <CBText style={appStyles.text} define={'text'}>{message}</CBText>
            <CBView style={[appStyles.row, {justifyContent: 'flex-end', marginTop: 10}]} define={'none'}>
                <CBAction title={strings('action_skip')} onPress={onSkip}/>
                <CBButton containerStyle={{marginLeft: 10}} buttonStyle={appStyles.sphere} icon={{type: type, name: name, color: color, size: size}} onPress={requestNotificationPermission}/>
            </CBView>
        </CBView>
    );
};

export default NotificationReminder;
