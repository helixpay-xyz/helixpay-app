import React from 'react';
import SendSuccessContent from 'screens/helixpay/home/balance/content/SendSuccessContent';
import RootNavigation from 'screens/RootNavigation';

import Base from 'screens/Base';

export default class SendSuccess extends Base {

    constructor(props) {
        super(props);
        this.state = {
            order: []
        }
    };

    componentDidMount() {
        super.componentDidMount();
        this.load();
    };

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    load() {
        const order = this.defaultParam?.order;
        this.setState({
            order: order || []
        });
    }

    onRefresh = () => {

    }


    onBack = () => {
        RootNavigation.goBack();
    }

    onGoHome = () => {
        RootNavigation.navigate('Home');
    }
    render() {
        const {order} = this.state;
        return (
        <>
            <SendSuccessContent defaultParam={this.defaultParam} order={order} onRefresh={this.onRefresh} onBack={this.onBack} onGoHome={this.onGoHome}/>
        </>
        );
    }
}
