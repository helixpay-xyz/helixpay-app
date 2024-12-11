import React, {forwardRef} from 'react';
import {Header} from 'react-native-elements';

const CBHeader = (props, ref) => {
    return (
        <Header ref={ref} {...props}/>
    );
};

export default forwardRef(CBHeader);

