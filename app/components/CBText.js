import React, {forwardRef} from 'react';
import {Text} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBText = (props, ref) => {
    const {theme} = useTheme();
    const textStyle = helpers(props.define, theme.colors.scheme);
    return (
        <Text ref={ref} {...props} style={[props.style, textStyle]}/>
    );
};

export default forwardRef(CBText);

