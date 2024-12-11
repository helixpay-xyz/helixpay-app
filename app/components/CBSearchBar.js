import React, {forwardRef} from 'react';
import {SearchBar} from 'react-native-elements';

const CBSearchBar = (props, ref) => {
    return (
        <SearchBar ref={ref} {...props}/>
    );
};

export default forwardRef(CBSearchBar);
