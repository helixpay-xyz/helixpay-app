import React from 'react';
import SendContent from 'screens/helixpay/home/balance/content/SendContent';
import RootNavigation from 'screens/RootNavigation';
import SendConfirmationPopup from 'screens/popup/SendConfirmationPopup';

import Base from 'screens/Base';
import {strings} from "controls/i18n";

export default class Send extends Base {

    constructor(props) {
        super(props);
        this.sendConfirmationRef = React.createRef();
    }

    onRefresh = () => {

    }

    onSend = (values) => {
        this.sendConfirmationRef.current.show(
            {
                title: 'Confirm Order',
                order : [
                    { label: 'Receive Amount', value: values.amount },
                    { label: 'Network', value: 'Viction' },
                    { label: 'Send From', value: 'misterbo' },
                    { label: 'Receiver', value: values.address },
                    { label: 'Note', value: 'Nothing' }
                ],
                onSendSuccess: this.onSendSuccess
            }
        );
    }

    onBack = () => {
        RootNavigation.goBack();
    }

    onAction = (name) => {
        this.onSendSuccess();
    };

    onSendSuccess = () => {
        RootNavigation.navigate('SendSuccess');
    }

    render() {
        return (
        <>
            <SendContent defaultParam={this.defaultParam} onRefresh={this.onRefresh} onSend={this.onSend} onBack={this.onBack}/>
            <SendConfirmationPopup ref={this.sendConfirmationRef} onAction={this.onAction}/>
        </>
        );
    }
}
