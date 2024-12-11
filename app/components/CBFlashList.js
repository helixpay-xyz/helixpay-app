import React, {forwardRef} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBFlatList = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <FlashList ref={ref} {...props} style={[props.style, viewStyle]} estimatedItemSize={props.estimatedItemSize || 128}/>
    );
};

export default forwardRef(CBFlatList);

