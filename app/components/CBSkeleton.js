import React, {forwardRef} from 'react';
import {View} from 'react-native';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';
import {useTheme} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBSkeleton = ({style, children, minOpacity = 0.3, maxOpacity = 1.0, define = 'none'}, ref) => {
    const offset = useSharedValue(minOpacity);
    offset.value = withRepeat(
        withTiming(maxOpacity, {
            duration: 800,
            easing: Easing.ease
        }),
        -1,
        true
    );
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: offset.value
    }), []);
    const {theme} = useTheme();
    const viewStyle = helpers(define, theme.colors.scheme);
    const skeletonColor = helpers('skeleton', theme.colors.scheme);
    return (
        <Animated.View
            ref={ref}
            style={[animatedStyles, style, viewStyle]}>
            {React.Children.map(children, (i, k) => <View key={k} style={[i.props.style, {backgroundColor: skeletonColor}]}/>)}
        </Animated.View>
    );
};

export default forwardRef(CBSkeleton);
