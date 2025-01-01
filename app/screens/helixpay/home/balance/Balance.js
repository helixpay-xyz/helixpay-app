import React from 'react';
import RootNavigation from 'screens/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BalanceContent from 'screens/helixpay/home/balance/content/BalanceContent';
import CBHelper from 'helpers/CBHelper';
import CBSyncHandler from 'handlers/CBSyncHandler';
import CBRunHandler from 'handlers/CBRunHandler';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import { strings } from 'controls/i18n';
import axios from 'axios';

import Base from 'screens/Base';

export default class Balance extends Base {

    constructor(props) {
        super(props);
        this.state = {
            address: null,
            refreshing: false,
            balances: null,
            transactions: [],
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.load();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    load() {
        CBHelper.reactionApplication();
        CBHelper.refreshApplication(() => {
            CBSyncHandler.sync();
            CBRunHandler.run();
        });
        this.setState({
            refreshing: true,
        }, async () => {
            const address = await AsyncStorage.getItem('@address');
            this.setState({ address }, () => {
                if (address) {
                    this.getBalance(address);
                    this.getTransactionData(address);
                }
            });
        });
    }

    onSend = () => {
        RootNavigation.navigate('Send');
    }

    onRefresh = () => {
        this.load();
    }

    onCopyAddress = () => {
        const { address } = this.state;
        Clipboard.setString(address);
        Toast.show(strings('text_copied_to_clipboard'), Toast.LONG);
    }

    async getEthToUsdPrice() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            return response.data.ethereum.usd;
        } catch (error) {
            console.error('Error fetching Ether to USD price:', error);
            return 0;
        }
    }

    async getBalance(address) {
        const url = `https://scan-api-testnet.viction.xyz/api/account/${address}/tokenBalance?offset=0&limit=50`;
        try {
            const response = await axios.get(url);
            if (response.data) {
                const balances = response?.data;
                this.setState({ balances: balances, refreshing: false });
            } else {
                console.log('Error fetching balance from Viction:2', response.data.message || 'No data available');
                this.setState({ refreshing: false });
            }
        } catch (error) {
            console.error('Error fetching balance from Viction1:', error);
            this.setState({ refreshing: false });
        }
    }

    async getTransactionData(address) {
        const url = `https://scan-api-testnet.viction.xyz/api/transaction/list?account=${address}&offset=0&limit=20`;

        try {
            const response = await axios.get(url);

            if (response.data && response.data.data) {
                this.setState({ transactions: response.data.data, refreshing: false});
            } else {
                console.error('No transaction data available');
                this.setState({ refreshing: false });
            }
        } catch (error) {
            console.error('Error fetching transaction data:', error);
            this.setState({ refreshing: false });
        }
    }

    render() {
        const {refreshing, address, balances, transactions} = this.state;
        return (
            <BalanceContent defaultParam={this.defaultParam} refreshing={refreshing} address={address} balances={balances} transactions={transactions} onRefresh={this.onRefresh} onCopyAddress={this.onCopyAddress} onSend={this.onSend}/>
        );
    }
}
