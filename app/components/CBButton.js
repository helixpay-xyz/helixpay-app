import React, {forwardRef, useCallback} from 'react';
import {Keyboard} from 'react-native';
import {Button} from 'react-native-elements';
import {debounce} from 'lodash';

const CBButton = (props, ref) => {
    const onPress = () => {
        Keyboard.dismiss();
        props.onPress && props.onPress();
    };
    const onPressDebounce = useCallback(debounce(onPress, 300, {leading: false, trailing: true}), [props]);
    return (
        <Button ref={ref} {...props} onPress={onPressDebounce}/>
    );
};

export default forwardRef(CBButton);

