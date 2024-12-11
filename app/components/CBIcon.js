import React, {forwardRef} from 'react';
import {Icon, useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBIcon = (props, ref) => {
    const {theme} = useTheme();
    const iconColor = helpers(props.define, theme.colors.scheme);
    return <Icon ref={ref} {...props} color={props.color || iconColor}/>;
};

export default forwardRef(CBIcon);

