import React, {forwardRef} from 'react';
import {ButtonGroup} from 'react-native-elements';

const CBButtonGroup = (props, ref) => {
    return (
        <ButtonGroup ref={ref} {...props}/>
    );
};

export default forwardRef(CBButtonGroup);

