import React from 'react';
import SendSuccessContent from 'screens/helixpay/home/balance/content/SendSuccessContent';
import RootNavigation from 'screens/RootNavigation';

import Base from 'screens/Base';

export default class SendSuccess extends Base {

    constructor(props) {
        super(props);
    }

    onRefresh = () => {

    }


    onBack = () => {
        RootNavigation.goBack();
    }
    render() {
        return (
        <>
            <SendSuccessContent defaultParam={this.defaultParam} onRefresh={this.onRefresh} onSend={this.onSend} onBack={this.onBack}/>
        </>
        );
    }
}
