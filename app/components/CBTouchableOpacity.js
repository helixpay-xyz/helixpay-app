import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBTouchableOpacity = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <TouchableOpacity ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBTouchableOpacity);

