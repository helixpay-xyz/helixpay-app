import React, {forwardRef} from 'react';
import {Badge} from 'react-native-elements';

const CBBadge = (props, ref) => {
    return (
        <Badge ref={ref} {...props}/>
    );
};

export default forwardRef(CBBadge);

