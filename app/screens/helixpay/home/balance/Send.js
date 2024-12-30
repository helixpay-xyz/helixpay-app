import React from 'react';
import SendContent from 'screens/helixpay/home/balance/content/SendContent';
import RootNavigation from "screens/RootNavigation";

import Base from 'screens/Base';

export default class Send extends Base {

    onRefresh = () => {

    }

    onBack = () => {
        RootNavigation.goBack();
    }
    render() {
        return <SendContent defaultParam={this.defaultParam} onRefresh={this.onRefresh} onBack={this.onBack}/>;
    }
}
