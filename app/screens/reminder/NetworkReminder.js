import React, {useEffect} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {DeviceEventEmitter} from 'react-native';
import {CBIcon, CBShadow, CBText} from 'components';
import NetInfo from '@react-native-community/netinfo';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import colors from 'configs/colors';

const NetworkReminder = ({style, type, name, color, size, message}) => {
    const [enable, setEnable] = useStateWithCallbackLazy(false);
    useEffect(() => {
        handleConnectivityChange({isConnected: true});
        const unsubscribeNetwork = NetInfo.addEventListener(handleConnectivityChange);
        return () => unsubscribeNetwork();
    }, []);
    const handleConnectivityChange = ({isConnected}) => {
        setEnable(!isConnected, loadNetworkEvent);
    };
    const loadNetworkEvent = () => {
        DeviceEventEmitter.emit('NETWORK_STATUS', !enable);
    };
    const {theme} = useTheme();
    const backgroundColor = theme.colors.scheme === 'dark' ? colors.yellowDark : colors.yellow;
    return enable && (
        <CBShadow style={[appStyles.item, appStyles.pack, {backgroundColor: backgroundColor, borderRadius: 15}, style]}>
            <CBIcon type={type} name={name} color={color} size={size}/>
            <CBText style={[appStyles.subtext, {flex: 1, color: color, marginLeft: 15}]} define={'none'}>{message}</CBText>
        </CBShadow>
    );
};

export default NetworkReminder;
