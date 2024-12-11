import React, {forwardRef} from 'react';
import {BottomSheet} from 'react-native-elements';

const CBBottomSheet = (props, ref) => {
    return (
        <BottomSheet ref={ref} {...props}/>
    );
};

export default forwardRef(CBBottomSheet);

