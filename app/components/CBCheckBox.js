import React, {forwardRef} from 'react';
import {CheckBox} from 'react-native-elements';

const CBCheckBox = (props, ref) => {
    return (
        <CheckBox ref={ref} {...props} textStyle={props.disabled ? {...props.textStyle, opacity: 0.3} : {...props.textStyle}} iconType={'ionicon'} checkedIcon={'checkbox'} uncheckedIcon={'square-outline'}/>
    );
};

export default forwardRef(CBCheckBox);

