import React, {forwardRef} from 'react';
import {Menu, MenuItem} from 'react-native-enhanced-popup-menu';
import {useTheme} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBMenu = ({style, items = [], renderHeader, renderFooter}, ref) => {
    const {theme} = useTheme();
    const menuStyle = helpers('menu', theme.colors.scheme);
    const textStyle = helpers('text', theme.colors.scheme);
    return (
        <Menu ref={ref} style={[style, menuStyle]}>
            {renderHeader ? renderHeader : null}
            {items.map((i, k) => <MenuItem key={k} textStyle={[appStyles.text, textStyle]} onPress={i.onPress}>{i.text}</MenuItem>)}
            {renderFooter ? renderFooter : null}
        </Menu>
    );
};

export default forwardRef(CBMenu);
