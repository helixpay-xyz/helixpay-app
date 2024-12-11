import React from 'react';
import {BackHandler, Platform, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {WebView} from 'react-native-webview';
import RootNavigation from 'screens/RootNavigation';
import {HeaderBackButton} from '@react-navigation/elements';
import {CBButton, CBContainer, CBDivider, CBIcon, CBImage, CBMenu, CBText, CBTouchableOpacity, CBView} from 'components';
import CBConstant from 'constants/CBConstant';
import EventTracker from 'controls/EventTracker';
import CBControl from 'controls/CBControl';
import CBHandler from 'handlers/CBHandler';
import ImageUtil from 'utils/ImageUtil';
import {Position} from 'react-native-enhanced-popup-menu';
import Orientation from 'react-native-orientation';
import * as Progress from 'react-native-progress';
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';
import Pdf from 'react-native-pdf';
import {moderateScale} from 'utils/ThemeUtil';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

import Base from 'screens/Base';

export default class Web extends Base {

    constructor(props) {
        super(props);
        this.webView = React.createRef();
        this.menu = React.createRef();
        this.anchor = React.createRef();
        this.state = {
            progress: 0,
            canGoBack: false,
            canGoForward: false,
            source: {uri: 'https://google.com'},
            incognito: false,
            javascript: '',
            orientation: Orientation.getInitialOrientation()
        };
    }

    componentDidMount() {
        super.componentDidMount();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        Orientation.addOrientationListener(this.orientationDidChange);
        this.load();
    }

    setOptions(navigation, route) {
        const {params} = route;
        const {title, isOrientation} = params || {};
        navigation.setOptions({
            title: title || strings('screen_web'),
            headerBackImage: this.renderHeaderBackImage,
            headerLeft: (props) => <HeaderBackButton {...props} onPress={this.handleBackPress}/>,
            headerRight: () => (
                <CBView style={[appStyles.row, {marginRight: 5}]} define={'none'}>
                    {isOrientation ? <CBTouchableOpacity style={appStyles.action} define={'none'} onPress={this.onPortraitOrLandscape}>
                        <CBIcon define={'icon'} type={'material-community'} name={'phone-rotate-landscape'} size={20}/>
                    </CBTouchableOpacity> : null}
                    <CBTouchableOpacity style={appStyles.action} define={'none'} onPress={this.onMenu}>
                        <CBIcon define={'icon'} type={'material-community'} name={'dots-horizontal'} size={25}/>
                    </CBTouchableOpacity>
                </CBView>
            )
        });
    }

    componentBlur() {
        const {orientation} = this.state;
        if (orientation === 'LANDSCAPE') Orientation.lockToPortrait();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        const {orientation} = this.state;
        if (orientation === 'LANDSCAPE') Orientation.lockToPortrait();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
        Orientation.removeOrientationListener(this.orientationDidChange);
        clearInterval(this.timer);
    }

    renderHeaderBackImage = (props) => {
        if (Platform.OS === 'android') {
            return <CBIcon type={'ionicon'} name={'close-outline'} color={props.tintColor} size={30}/>;
        } else {
            return (
                <CBView style={[appStyles.action, {marginLeft: 5}]} define={'none'}>
                    <CBIcon type={'ionicon'} name={'close-outline'} color={props.tintColor} size={30}/>
                </CBView>
            );
        }
    };

    handleBackPress = () => {
        /*const {canGoBack} = this.state;
        if (canGoBack) {
            this.webView.current.goBack();
        } else {
            RootNavigation.goBack();
        }*/
        RootNavigation.goBack();
        return true;
    };

    orientationDidChange = (orientation) => {
        this.setState({
            orientation: orientation
        });
    };

    onPortraitOrLandscape = () => {
        const {orientation} = this.state;
        if (orientation === 'PORTRAIT') {
            if (Platform.OS === 'android') {
                Orientation.lockToLandscapeLeft();
            } else {
                Orientation.lockToLandscapeRight();
            }
        } else {
            Orientation.lockToPortrait();
        }
    };

    onMenu = () => {
        this.menu.current.show(this.anchor.current, Position.TOP_RIGHT, {top: 0, left: dimens.widthScreen});
        EventTracker.logEvent('screen_web', {action: 'click_button_menu'});
    };

    onBack = () => {
        this.menu.current.hide();
        this.webView.current.goBack();
        EventTracker.logEvent('screen_web', {action: 'click_button_back'});
    };

    onForward = () => {
        this.menu.current.hide();
        this.webView.current.goForward();
        EventTracker.logEvent('screen_web', {action: 'click_button_forward'});
    };

    onReload = () => {
        this.menu.current.hide();
        this.webView.current.reload();
        EventTracker.logEvent('screen_web', {action: 'click_button_reload'});
    };

    onShare = () => {
        if (this.url) {
            this.menu.current.hide();
            setTimeout(() => {
                Share.open({url: this.url}).then((response) => {

                }).catch((error) => {
                    console.log('error -> ' + JSON.stringify(error));
                });
            }, Platform.select({android: 300, ios: 600}));
        }
        EventTracker.logEvent('screen_web', {action: 'click_button_share'});
    };

    onCopy = () => {
        if (this.url) {
            this.menu.current.hide();
            setTimeout(() => {
                Clipboard.setString(this.url);
                Toast.show(strings('toast_copied'), Toast.SHORT);
            }, Platform.select({android: 300, ios: 600}));
        }
        EventTracker.logEvent('screen_web', {action: 'click_button_copy'});
    };

    onOpenWithBrowser = () => {
        if (this.url) {
            this.menu.current.hide();
            CBHandler.openUrl(this.url);
        }
        EventTracker.logEvent('screen_web', {action: 'click_button_open_with_browser'});
    };

    onExit = () => {
        this.menu.current.hide();
        RootNavigation.goBack();
        EventTracker.logEvent('screen_web', {action: 'click_button_exit'});
    };

    load() {
        const {uri, headers, incognito, javascript} = this.defaultParam || {};
        this.url = uri || 'https://google.com';
        this.setState({
            source: {
                uri: uri || 'https://google.com',
                headers: headers || {}
            },
            incognito: incognito || false,
            javascript: javascript || ''
        }, this.updateProgress);
    }

    updateProgress = () => {
        this.timer = setInterval(() => {
            const {progress} = this.state;
            if (progress < 0.8) {
                this.setState({
                    progress: progress + (0.2 * Math.random())
                });
            } else {
                clearInterval(this.timer);
            }
        }, 300);
    };

    onShouldStartLoadWithRequest = (request) => {
        const url = request.url;
        if (url.startsWith('intent://user/') && url.indexOf('fb-messenger') > -1) {
            CBHandler.openUrl(url.replace('intent://user/', 'fb-messenger://user/'), Platform.select({
                android: CBConstant.MESSENGER_PLAY_STORE_LINK,
                ios: CBConstant.MESSENGER_APP_STORE_LINK
            }));
            return false;
        } else if (url.startsWith("tel:") || request.url.startsWith("mailto:")) {
            CBHandler.openUrl(url);
            return false;
        }
        return true;
    };

    onNavigationStateChange = (navState) => {
        this.url = navState.url;
        this.setState({
            progress: navState.loading ? 0 : 1,
            canGoBack: navState.canGoBack,
            canGoForward: navState.canGoForward
        }, this.updateProgress);

        const {url} = navState;
        if (url && url.indexOf('/close') > -1) {
            RootNavigation.goBack();
        }
    };

    onLoad = () => {

    };

    onLoadEnd = () => {

    };

    onErrorWebView = (syntheticEvent) => {
        const {nativeEvent} = syntheticEvent;
        if (nativeEvent) {
            this.setState({progress: 1});
        }
    };

    onTryAgain = () => {
        this.webView.current.reload();
        EventTracker.logEvent('screen_web', {action: 'click_button_try_again'});
    };

    renderError = (domain, code, description) => {
        return (
            <CBView style={[appStyles.overlay]} define={'overlay'}>
                <CBImage containerStyle={[appStyles.image, {width: moderateScale(180), height: moderateScale(180)}]} source={ImageUtil.getImage('ic_warning')} resizeMode={'contain'}/>
                <CBText style={[appStyles.title, {textAlign: 'center', marginTop: 15}]} define={'title'}>{code}</CBText>
                <CBText style={[appStyles.text, {textAlign: 'center', marginTop: 15}]} define={'text'}>{description}</CBText>
                <CBButton containerStyle={{marginTop: 15}} title={strings('button_try_again')} onPress={this.onTryAgain}/>
            </CBView>
        );
    };

    onMessage = (event) => {
        const data = event.nativeEvent.data;
        const handleDataSourceChange = this.getParam('handleDataSourceChange');
        if (data.match(`BACK|ERROR|EXIT`)) {
            RootNavigation.goBack();
        } else if (data.match(`HOME`)) {
            RootNavigation.goHome();
        } else if (handleDataSourceChange && typeof handleDataSourceChange === 'function') {
            handleDataSourceChange(data);
        } else if (data.indexOf('~') > -1) {
            const array = data.split('~');
            CBControl.navigateWith(array[0], array[1], array[2]);
        }
    };

    onLoadComplete = (numberOfPages, path, {width, height}) => {

    };

    onPageChanged = (page, numberOfPages) => {

    };

    onErrorPdf = (error) => {

    };

    onPressLink = (uri) => {
        if (uri && uri.startsWith('http')) {
            CBHandler.openUrl(uri);
        } else if (uri && uri.length > 0) {
            const array = uri.split('~');
            CBControl.navigateWith(array[0], array[1], array[2]);
        }
    };

    render() {
        const {theme} = this.context;
        const {progress, canGoBack, canGoForward, source, incognito, javascript} = this.state;
        const isPdf = source?.uri?.endsWith('.pdf');
        return (
            <CBContainer>
                {/*<Progress.Bar
                    color={progress < 1 ? theme.colors.primary : theme.colors.background}
                    borderWidth={0}
                    borderColor={theme.colors.background}
                    borderRadius={0}
                    height={1}
                    progress={progress}
                    width={dimens.widthScreen}/>*/}
                {!isPdf ? <WebView
                    ref={this.webView}
                    source={source}
                    originWhitelist={['*']}
                    incognito={incognito}
                    cacheEnabled={true}
                    cacheMode={'LOAD_DEFAULT'}
                    startInLoadingState={true}
                    sharedCookiesEnabled={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={javascript}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onLoad={this.onLoad}
                    onLoadEnd={this.onLoadEnd}
                    onError={this.onErrorWebView}
                    renderError={this.renderError}
                    onMessage={this.onMessage}
                /> : <Pdf
                    style={{flex: 1}}
                    source={source}
                    onLoadComplete={this.onLoadComplete}
                    onPageChanged={this.onPageChanged}
                    onError={this.onErrorPdf}
                    onPressLink={this.onPressLink}
                />}
                <TouchableOpacity ref={this.anchor} style={{position: 'absolute', top: 0, right: 0, width: 1, height: 1}}/>
                <CBMenu ref={this.menu} key={'cb_menu'}
                    items={[
                        {text: strings('action_share'), onPress: this.onShare},
                        {text: strings('action_copy'), onPress: this.onCopy},
                        {text: strings('action_open_with_browser'), onPress: this.onOpenWithBrowser},
                        //{text: strings('action_exit'), onPress: this.onExit}
                    ]}
                    renderHeader={
                        !isPdf ? <>
                            <CBView style={appStyles.row} define={'none'}>
                                <CBTouchableOpacity disabled={!canGoBack} style={[appStyles.action, {opacity: canGoBack ? 1 : 0.3}]} define={'none'} onPress={this.onBack}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'chevron-back-outline'} size={25}/>
                                </CBTouchableOpacity>
                                <CBTouchableOpacity disabled={!canGoForward} style={[appStyles.action, {opacity: canGoForward ? 1 : 0.3}]} define={'none'} onPress={this.onForward}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'chevron-forward-outline'} size={25}/>
                                </CBTouchableOpacity>
                                <CBTouchableOpacity style={appStyles.action} define={'none'} onPress={this.onReload}>
                                    <CBIcon define={'icon'} type={'ionicon'} name={'reload-outline'} size={20}/>
                                </CBTouchableOpacity>
                            </CBView>
                            <CBDivider/>
                        </> : null
                    }
                />
            </CBContainer>
        );
    }
}
