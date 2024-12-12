import React from 'react';
import {CBContainer, CBText} from 'components';
import {appStyles} from 'configs/styles';
import RootNavigation from 'screens/RootNavigation';

import BalanceContent from 'screens/mienpv/home/balance/content/BalanceContent';

import Base from 'screens/Base';

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
    }

    render() {
        return <BalanceContent defaultParam={this.defaultParam}/>;
    }
}
