import React, {forwardRef} from 'react';
import {Slider} from 'react-native-elements';

const CBSlider = (props, ref) => {
    return (
        <Slider ref={ref} {...props}/>
    );
};

export default forwardRef(CBSlider);

