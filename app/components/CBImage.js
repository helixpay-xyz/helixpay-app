import React, {forwardRef} from 'react';
import {Image} from 'react-native-elements';

const CBImage = (props, ref) => {
    return (
        <Image ref={ref} {...props}/>
    );
};

export default forwardRef(CBImage);

