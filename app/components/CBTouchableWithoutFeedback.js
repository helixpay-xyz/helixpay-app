import React, {forwardRef} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBTouchableWithoutFeedback = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <TouchableWithoutFeedback ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBTouchableWithoutFeedback);

