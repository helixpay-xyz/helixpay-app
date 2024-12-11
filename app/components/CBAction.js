import React, {forwardRef} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBAction = ({style, disabled, iconLeft, title, titleStyle, iconRight, onPress}, ref) => {
    const {theme} = useTheme();
    const activeStyle = helpers('active', theme.colors.scheme);
    const inactiveStyle = helpers('inactive', theme.colors.scheme);
    return (
        <TouchableOpacity
            ref={ref}
            style={[appStyles.row, style]}
            disabled={disabled}
            pointerEvents={disabled ? 'none' : 'auto'}
            onPress={onPress}>
            {iconLeft}
            <Text style={[appStyles.text, disabled ? inactiveStyle : activeStyle, titleStyle]}>{title}</Text>
            {iconRight}
        </TouchableOpacity>
    );
};

export default forwardRef(CBAction);

