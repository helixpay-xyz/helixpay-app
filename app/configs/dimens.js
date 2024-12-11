import {Dimensions, Platform} from 'react-native';
import {ifIphoneX, getBottomSpace, getStatusBarHeight, hasIsland} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get('window');

export default {
    isTablet: DeviceInfo.isTablet(),
    statusBar: getStatusBarHeight(true),
    bottomSpace: ifIphoneX(getBottomSpace(), 0),
    appBar: Platform.select({android: 56, ios: 44}),
    keyboardVerticalOffset: ifIphoneX(88 + (hasIsland() ? 15 : 0), 64),
    widthScreen: width,
    heightScreen: height,
    yottaLargeText: 38,
    zettaLargeText: 36,
    exaLargeText: 34,
    petaLargeText: 32,
    teraLargeText: 30,
    megaLargeText: 27,
    xxxLargeText: 25,
    xxLargeText: 23,
    xLargeText: 21,
    largeText: 19,
    mediumText: 17,
    normalText: 15,
    smallText: 13,
    tinyText: 11,
    atomText: 9
}
