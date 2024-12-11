import React, {forwardRef} from 'react';
import {LinearProgress} from 'react-native-elements';

const CBLinearProgress = (props, ref) => {
    return (
        <LinearProgress ref={ref} {...props}/>
    );
};

export default forwardRef(CBLinearProgress);
