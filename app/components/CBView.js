import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBView = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <View ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBView);

