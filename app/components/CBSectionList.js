import React, {forwardRef} from 'react';
import {SectionList} from 'react-native';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBSectionList = (props, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(props.define, theme.colors.scheme);
    return (
        <SectionList ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBSectionList);

