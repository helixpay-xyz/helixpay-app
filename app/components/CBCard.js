import React, {forwardRef} from 'react';
import {Card} from 'react-native-elements';

const CBCard = (props, ref) => {
    return (
        <Card ref={ref} {...props}/>
    );
};

export default forwardRef(CBCard);

