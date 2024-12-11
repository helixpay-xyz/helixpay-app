import React, {forwardRef} from 'react';
import FastImage from 'react-native-fast-image';

const CBFastImage = (props, ref) => {
    return (
        <FastImage ref={ref} {...props}/>
    );
};

export default forwardRef(CBFastImage);

