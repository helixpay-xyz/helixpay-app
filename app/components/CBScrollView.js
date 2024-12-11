import React, {forwardRef} from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBScrollView = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <ScrollView ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBScrollView);

