import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBShadow = ({style, children}, ref) => {
    const {theme} = useTheme();
    const shadowStyle = helpers('shadow', theme.colors.scheme);
    return (
        <View ref={ref} style={[appStyles.shadow, style, shadowStyle]}>
            {children}
        </View>
    );
};

export default forwardRef(CBShadow);

