import React, {forwardRef} from 'react';
import {RefreshControl} from 'react-native';

const CBRefreshControl = (props, ref) => {
    return (
        <RefreshControl ref={ref} {...props}/>
    );
};

export default forwardRef(CBRefreshControl);
