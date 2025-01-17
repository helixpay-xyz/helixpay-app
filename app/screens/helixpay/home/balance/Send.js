import React from 'react';
import SendContent from 'screens/helixpay/home/balance/content/SendContent';
import RootNavigation from 'screens/RootNavigation';
import SendConfirmationPopup from 'screens/popup/SendConfirmationPopup';

import Base from 'screens/Base';
import {strings} from "controls/i18n";
import JsonUtil from "utils/JsonUtil";
import {bytesToHex, createPublicClient, encodeFunctionData, hashMessage, http, keccak256} from "viem";
import {victionTestnet} from "viem/chains";
import {getPublicKey, getSharedSecret, ProjectivePoint, utils} from "@noble/secp256k1";
import {publicKeyToAddress} from "viem/accounts";

export default class Send extends Base {

    constructor(props) {
        super(props);
        this.client = createPublicClient({
            chain: victionTestnet,
            transport: http(),
        });
        this.sendConfirmationRef = React.createRef();
    }

    onRefresh = () => {

    };

    generateStealthAddress = (stealthMeta) => {
        const ephemeralPrivateKey = utils.randomPrivateKey();
        const ephemeralPublicKey = getPublicKey(ephemeralPrivateKey, true);
        const sharedSecret = getSharedSecret(
            ephemeralPrivateKey,
            ProjectivePoint.fromHex(stealthMeta.viewingPublicKey.slice(2)).toRawBytes(
                true
            )
        );

        const hashSharedSecret = keccak256(sharedSecret);
        const viewTag = this.getViewTag(hashSharedSecret);

        const newStealthPublicKey = this.getStealthPublicKey(
            stealthMeta.spendingPublicKey,
            hashSharedSecret
        );
        const newStealthAddress = publicKeyToAddress(newStealthPublicKey);

        return {
            stealthPublicKey: newStealthAddress,
            ephemeralPublicKey: bytesToHex(ephemeralPublicKey),
            viewTag,
        };
    };

    parseKeysFromStealthMetaAddress = (stealthMeta) => {
        const spendingPublicKey = `0x${stealthMeta.slice(2, 68)}`;
        const viewingPublicKey = `0x${stealthMeta.slice(68)}`;

        return {
            spendingPublicKey,
            viewingPublicKey,
        };
    };

    fetchStealthData = async (username) => {
        const hashUsername = hashMessage(username);
        try {
            const data = await this.client.readContract({
                address: '0x5715729dcfFc6717eb53D4E4446322368d4cF7F3',
                abi: require('assets/jsons/stealth.abi.json'),
                functionName: 'keys',
                args: [hashUsername]
            });
            console.log('Hiihi:', data);
        } catch (error) {
            console.error('Error reading contract:', error);
        }
    };


    onSend = async (values) => {
        const orderData = [
            { label: 'Receive Amount', value: values.amount },
            { label: 'Network', value: 'Viction' },
            { label: 'Send From', value: 'misterbo' },
            { label: 'Receiver', value: values.address },
            { label: 'Note', value: 'Nothing' }
        ]
        await this.fetchStealthData(values.address);
        // this.sendConfirmationRef.current.show(
        //     {
        //         title: 'Confirm Order',
        //         order : orderData,
        //         onSendSuccess: this.onSendSuccess(orderData)
        //     }
        // );
    }

    onBack = () => {
        RootNavigation.goBack();
    }

    onAction = (name) => {
        this.onSendSuccess();
    };

    onSendSuccess = (order) => () => {
        RootNavigation.navigate('SendSuccess', {
            defaultParam: JsonUtil.buildDefaultParam({
                order: order || [],
            })
        });
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
