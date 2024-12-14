import React from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootNavigation from 'screens/RootNavigation';
import {CBButton, CBIcon, CBImageBackground, CBScaleImage, CBText, CBTouchableOpacity, CBView} from 'components';
import CBServiceCode from 'constants/CBServiceCode';
import CBControl from 'controls/CBControl';
import ImageUtil from 'utils/ImageUtil';
import PagerView from 'react-native-pager-view';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';
import colors from 'configs/colors';

import Base from 'screens/Base';

export default class Introduction extends Base {

    constructor(props) {
        super(props);
        this.pagerView = React.createRef();
        this.state = {
            index: 0,
            introductions: [
                {image: ImageUtil.getImage('logo_intro_0'), title: strings('text_title_intro_0'), subtitle: strings('text_subtitle_intro_0')},
                {image: ImageUtil.getImage('logo_intro_1'), title: strings('text_title_intro_1'), subtitle: strings('text_subtitle_intro_1')},
                {image: ImageUtil.getImage('logo_intro_2'), title: strings('text_title_intro_2'), subtitle: strings('text_subtitle_intro_2')},
            ]
        };
    }

    onPageSelected = (e) => {
        this.setState({
            index: e.nativeEvent.position
        });
    };

    onPage = () => {
        const {index} = this.state;
        this.pagerView.current.setPage(index);
    };

    onSkip = async () => {
        await AsyncStorage.setItem('@app_introduction', 'true');
        RootNavigation.goBack();
    };

    onStart = async () => {
        await AsyncStorage.setItem('@app_introduction', 'true');
        RootNavigation.goBack();
        // setTimeout(() => CBControl.navigateWith(CBServiceCode.APP_SERVICE_LOGIN_OR_REGISTER), 300);
    };

    onCreateWallet = () => {
        RootNavigation.navigate('CreateWallet');
    }

    onNextOrStart = () => {
        const {index, introductions} = this.state;
        if (index < introductions.length - 1) {
            this.setState({
                index: index + 1
            }, this.onPage);
        } else {
            this.onStart();
        }
    };

    renderPages = (i, k) => {
        return (
            <CBView key={k} style={{flex: 1}} define={'none'}>
                <CBView style={{justifyContent: 'center', alignItems: 'center'}}>
                    <CBScaleImage width={dimens.widthScreen - 50} source={i.image}/>
                </CBView>
                <CBView style={{flex: 1, marginTop: 60, padding: 15, justifyContent: 'space-between'}} define={'none'}>
                    <CBText style={[appStyles.heading, {textAlign: 'center'}]} define={'heading'} numberOfLines={1} ellipsizeMode={'tail'}>{i.title}</CBText>
                    <CBText style={[appStyles.text, {textAlign: 'center'}]} define={'text'} numberOfLines={2} ellipsizeMode={'tail'}>{i.subtitle}</CBText>
                </CBView>
            </CBView>
        );
    };

    renderDots = (i, k) => {
        const {index} = this.state;
        return <CBView key={k} style={index === k ? appStyles.bar : appStyles.dot} define={'none'}/>;
    };

    render() {
        const {theme} = this.context;
        const {index, introductions} = this.state;
        const width = dimens.widthScreen - 60;
        return (
            <CBImageBackground style={[{width: dimens.widthScreen, height: dimens.heightScreen, justifyContent: 'flex-start'}]} imageStyle={{width: dimens.widthScreen, height: dimens.heightScreen}} source={ImageUtil.getImage('background_1')}>
                <CBView style={[{flex: 1, paddingBottom: dimens.bottomSpace}, {marginTop: dimens.statusBar + 30}]}>
                    <PagerView ref={this.pagerView} style={{height: dimens.widthScreen + 120}} initialPage={0} onPageSelected={this.onPageSelected}>
                        {introductions.map(this.renderPages)}
                    </PagerView>
                    <CBView style={[appStyles.column, {flex: 1, justifyContent: 'space-between'}]} define={'none'}>
                        <CBView style={[appStyles.row, {marginTop: 15, justifyContent: 'center', marginVertical: 10}]} define={'none'}>
                            {introductions.map(this.renderDots)}
                        </CBView>
                        <CBView define={'none'}>
                            <CBButton buttonStyle={{height: 50, width, borderWidth: 0, marginVertical: 10}} type={'outline'} title={strings('button_wallet')} titleStyle={{fontFamily: 'GoogleSans-Medium'}} onPress={this.onCreateWallet}/>
                            <CBButton buttonStyle={{height: 50, width, borderWidth: 1, marginVertical: 10}} icon={{name: 'arrow-up-right', type: 'feather', size: 24}} iconRight iconContainerStyle={{marginLeft: 10}} title={strings('button_already_have_wallet')} titleStyle={{fontFamily: 'GoogleSans-Medium', color: colors.backgroundColor}} onPress={this.onNextOrStart}/>
                        </CBView>
                        {/*<CBButton buttonStyle={appStyles.circle} icon={<CBIcon type={'feather'} name={index < introductions.length - 1 ? 'arrow-right' :  'check'} color={'#FFFFFF'} size={25}/>} onPress={this.onNextOrStart}/>*/}
                    </CBView>
                    {index < 1 ? <CBTouchableOpacity style={[appStyles.row, {position: 'absolute', right: 15}]} define={'none'} onPress={this.onSkip}>
                        <CBText style={[appStyles.text, {marginRight: 5}]} define={'text'}>{strings('action_skip')}</CBText>
                        <CBIcon define={'icon'} type={'ionicon'} name={'arrow-forward-outline'} size={20}/>
                    </CBTouchableOpacity> : null}
                </CBView>
            </CBImageBackground>
        );
    }
}
