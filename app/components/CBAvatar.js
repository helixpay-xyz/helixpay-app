import React, {forwardRef} from 'react';
import {Avatar} from 'react-native-elements';

const CBAvatar = (props, ref) => {
    return (
        <Avatar ref={ref} {...props}/>
    );
};

export default forwardRef(CBAvatar);

