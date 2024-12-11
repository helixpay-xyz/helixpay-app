import React from 'react';
import RootNavigation from 'screens/RootNavigation';
import {CBButton, CBContainer, CBScaleImage, CBText, CBView} from 'components';
import EventTracker from 'controls/EventTracker';
import CBHandler from 'handlers/CBHandler';
import ImageUtil from 'utils/ImageUtil';
import {appStyles} from 'configs/styles';
import {strings} from 'controls/i18n';
import dimens from 'configs/dimens';

import Base from 'screens/Base';

export default class Empty extends Base {

    goHome = () => {
        RootNavigation.goHome();
        EventTracker.logEvent('screen_empty', {action: 'click_button_home'});
    };

    onUpdate = () => {
        CBHandler.openAppIntoStore();
        EventTracker.logEvent('screen_empty', {action: 'click_button_update'});
    };

    render() {
        const width = (dimens.widthScreen - 45) / 2;
        return (
            <CBContainer>
                <CBScaleImage width={dimens.widthScreen} source={ImageUtil.getImage('bg_not_found')}/>
                <CBView style={appStyles.body} define={'none'}>
                    <CBText style={appStyles.title} define={'title'}>{strings('text_oops')}</CBText>
                    <CBText style={[appStyles.text, {marginTop: 15}]} define={'text'}>{strings('text_not_found')}</CBText>
                </CBView>
                <CBView style={appStyles.footer} define={'none'}>
                    <CBButton buttonStyle={{width, borderWidth: 1}} type={'outline'} title={strings('button_home')} onPress={this.goHome}/>
                    <CBButton buttonStyle={{width, borderWidth: 1}} title={strings('button_update')} onPress={this.onUpdate}/>
                </CBView>
            </CBContainer>
        );
    }
}
