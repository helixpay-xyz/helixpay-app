import React, {forwardRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBRound = ({style, define, children, onPress}, ref) => {
    const {theme} = useTheme();
    const viewStyle = helpers(define, theme.colors.scheme);
    return (
        <TouchableOpacity ref={ref} style={[appStyles.round, style, viewStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

export default forwardRef(CBRound);
