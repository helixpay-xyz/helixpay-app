//write content view
import React, { Component } from 'react';
import { CBContainer, CBText } from 'components';

import {appStyles} from 'configs/styles';

//component function
//not class function
//Hooks
const BalanceContent = () => {
    return (
        <CBContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CBText style={[appStyles.text]}>{'t r '}</CBText>
        </CBContainer>
    );
}

export default BalanceContent;
