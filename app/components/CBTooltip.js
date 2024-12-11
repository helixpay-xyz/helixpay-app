import React, {forwardRef} from 'react';
import {Tooltip} from 'react-native-elements';

const CBTooltip = (props, ref) => {
    return (
        <Tooltip ref={ref} {...props}/>
    );
};

export default forwardRef(CBTooltip);

