import React from 'react';
import RootNavigation from 'screens/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BalanceContent from 'screens/helixpay/home/balance/content/BalanceContent';

import Base from 'screens/Base';
import CBHelper from "helpers/CBHelper";
import CBSyncHandler from "handlers/CBSyncHandler";
import CBRunHandler from "handlers/CBRunHandler";

export default class Balance extends Base {

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    load() {
        //se luu data duoi local, roi set buoc nay, khi moi chay app, se chac chan dien data
        //CASE1 IF data sdt luu o local null
        //TH1: data co tren database, login ok, hien user name, sdt
        //TH2: k co thi tao, login thanh cong, hien user name, sdt
        //CASE2 IF data sdt luu o local k null, vao main event
        //check data sdt co ton tai khong, neu co thi set name, k co thi mo cai modal len
        // RootNavigation.navigate('LoginOrRegister');
        CBHelper.reactionApplication();
        CBHelper.refreshApplication(() => {
            CBSyncHandler.sync();
            CBRunHandler.run();
        });
        this.setState({
            refreshing: false,
        }, async () => {
            // const value = await AsyncStorage.getItem('@app_introduction');
            // if (value !== 'true') RootNavigation.navigate('Introduction');
            RootNavigation.navigate('Introduction');
        });
    }

    onSend = () => {
        RootNavigation.navigate('Send');
    }

    onRefresh = () => {
    }

    render() {
        return <BalanceContent defaultParam={this.defaultParam} onRefresh={this.onRefresh} onSend={this.onSend}/>;
    }
}
