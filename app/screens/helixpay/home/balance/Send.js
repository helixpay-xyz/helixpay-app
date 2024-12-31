import React from 'react';
import SendContent from 'screens/helixpay/home/balance/content/SendContent';
import RootNavigation from "screens/RootNavigation";

import Base from 'screens/Base';

export default class Send extends Base {

    onRefresh = () => {

    }

    onSend = () => {
        console.log(`mienpv :: ${JSON.stringify('aa')}`);
    }

    onBack = () => {
        RootNavigation.goBack();
    }
    render() {
        return <SendContent defaultParam={this.defaultParam} onRefresh={this.onRefresh} onSend={this.onSend} onBack={this.onBack}/>;
    }
}
