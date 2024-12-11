import React, {forwardRef} from 'react';
import {Divider} from 'react-native-elements';

const CBDivider = (props, ref) => {
    return (
        <Divider ref={ref} {...props} style={props.style}/>
    );
};

export default forwardRef(CBDivider);

