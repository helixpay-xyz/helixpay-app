import React, {forwardRef} from 'react';
import {Input} from 'react-native-elements';

const CBInput = (props, ref) => {
    return (
        <Input ref={ref} {...props}/>
    );
};

export default forwardRef(CBInput);

