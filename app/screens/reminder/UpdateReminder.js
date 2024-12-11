import React, {useEffect} from 'react';
import {useStateWithCallbackLazy} from 'hooks';
import {Platform} from 'react-native';
import {CBIcon, CBShadow, CBText, CBTouchableOpacity} from 'components';
import ConfigManager from 'controls/ConfigManager';
import CBNative from 'modules/CBNative';
import JsonUtil from 'utils/JsonUtil';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import colors from 'configs/colors';

const UpdateReminder = ({style, type, name, color, size, message, onPress}) => {
    const [enable, setEnable] = useStateWithCallbackLazy(false);
    useEffect(() => {
        ConfigManager.getItem('app_config_update', (string) => {
            const value = JsonUtil.parseJsonString(string);
            if (value) {
                const app = Platform.select(value);
                setEnable(Number(CBNative.buildVersion) < Number(app.buildVersion));
            }
        });
    }, []);
    const {theme} = useTheme();
    const backgroundColor = theme.colors.scheme === 'dark' ? colors.contentDarkColor : colors.contentColor;
    return enable && (
        <CBShadow style={[{backgroundColor: backgroundColor, borderRadius: 15}, style]}>
            <CBTouchableOpacity style={[appStyles.row, {flex: 1, padding: 15}]} define={'none'} onPress={onPress}>
                <CBIcon type={type} name={name} color={color} size={size}/>
                <CBText style={[appStyles.subtext, {flex: 1, color: color, marginLeft: 15}]} define={'none'}>{message}</CBText>
            </CBTouchableOpacity>
        </CBShadow>
    );
};

export default UpdateReminder;
