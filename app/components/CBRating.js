import React, {forwardRef} from 'react';
import {AirbnbRating} from 'react-native-elements';

const CBRating = (props, ref) => {
    return (
        <AirbnbRating ref={ref} {...props}/>
    );
};

export default forwardRef(CBRating);
