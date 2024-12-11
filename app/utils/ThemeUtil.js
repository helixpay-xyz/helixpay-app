import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

export function horizontalScale(size) {
    if (Platform.OS === 'ios' && Platform.isPad) return size;
    return width / guidelineBaseWidth * size;
}

export function verticalScale(size) {
    if (Platform.OS === 'ios' && Platform.isPad) return size;
    return height / guidelineBaseHeight * size;
}

export function moderateScale(size, factor = 0.5) {
    if (Platform.OS === 'ios' && Platform.isPad) return size;
    return size + (horizontalScale(size) - size) * factor;
}

export function hexToRGBA(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
