import React, {forwardRef} from 'react';
import {CheckBox} from 'react-native-elements';

const CBRadio = (props, ref) => {
    return (
        <CheckBox ref={ref} {...props} textStyle={props.disabled ? {...props.textStyle, opacity: 0.3} : {...props.textStyle}} iconType={'ionicon'} checkedIcon={'radio-button-on-outline'} uncheckedIcon={'radio-button-off-outline'}/>
    );
};

export default forwardRef(CBRadio);

