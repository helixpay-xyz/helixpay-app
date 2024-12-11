import React, {forwardRef} from 'react';
import {FlatList} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBFlatList = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <FlatList ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBFlatList);

