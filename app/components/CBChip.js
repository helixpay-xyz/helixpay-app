import React, {forwardRef} from 'react';
import {Chip} from 'react-native-elements';

const CBChip = (props, ref) => {
    return (
        <Chip ref={ref} {...props}/>
    );
};

export default forwardRef(CBChip);
