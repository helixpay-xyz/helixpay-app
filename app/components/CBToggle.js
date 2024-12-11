import React, {forwardRef} from 'react';
import {CheckBox} from 'react-native-elements';

const CBToggle = (props, ref) => {
    return (
        <CheckBox ref={ref} {...props} iconType={'fontisto'} checkedIcon={'toggle-on'} uncheckedIcon={'toggle-off'} size={40}/>
    );
};

export default forwardRef(CBToggle);

