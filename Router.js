import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AppStore from 'stores/AppStore';
import {observer} from 'mobx-react';

import AuthLoading from 'screens/helixpay/AuthLoading';
import {UserStack} from 'screens/helixpay/UserNavigator';

const Stack = createStackNavigator();
export const RootStack = observer(() => {
    const {mode} = AppStore;
    // if (mode === 'AuthLoading') {
    //     return (
    //         <Stack.Navigator initialRouteName={'AuthLoading'}>
    //             <Stack.Screen name={'AuthLoading'} component={AuthLoading} options={{headerShown: false}}/>
    //         </Stack.Navigator>
    //     );
    // } else {
    //     return null;
    // }
    return <UserStack/>;
});


