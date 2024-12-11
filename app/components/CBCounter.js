import React, {forwardRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Icon, useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBCounter = ({containerStyle, inputStyle, min, max, value, onChange}, ref) => {
    const onSubtract = () => {
        if (value > min && onChange && typeof onChange === 'function') {
            onChange(value - 1);
        }
    };
    const onAdd = () => {
        if (value < max && onChange && typeof onChange === 'function') {
            onChange(value + 1);
        }
    };
    const {theme} = useTheme();
    const borderStyle = helpers('border', theme.colors.scheme);
    const iconColor = helpers('icon', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    return (
        <View ref={ref} style={[appStyles.row, appStyles.border, {borderRadius: 15}, borderStyle, containerStyle]}>
            {value > min ? <TouchableOpacity style={appStyles.action} onPress={onSubtract}>
                <Icon type={'ionicon'} name={'remove-circle-outline'} color={iconColor} size={25}/>
            </TouchableOpacity> : <View style={appStyles.action}/>}
            <Text style={[appStyles.text, {flex: 1, textAlign: 'center'}, textStyle, inputStyle]}>{value}</Text>
            {value < max ? <TouchableOpacity disabled={value >= max} style={appStyles.action} onPress={onAdd}>
                <Icon type={'ionicon'} name={'add-circle-outline'} color={iconColor} size={25}/>
            </TouchableOpacity> : <View style={appStyles.action}/>}
        </View>
    );
};

export default forwardRef(CBCounter);
