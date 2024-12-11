import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import {AppRegistry, Text, TextInput} from 'react-native';
import CBNotificationHandler from 'handlers/CBNotificationHandler';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import CodePush from 'react-native-code-push';
import {name as appName} from './app.json';
import App from './App';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.5;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.5;

require('moment/locale/en-gb');
require('moment/locale/vi');

window.FS = ReactNativeBlobUtil.fs;
window.File = ReactNativeBlobUtil.polyfill.File;
window.Fetch = new ReactNativeBlobUtil.polyfill.Fetch({
  auto: true,
  binaryContentTypes: ['image/', 'video/', 'audio/']
}).build();

Promise.allSettled = Promise.allSettled || (promises => Promise.all(
    promises.map(promise => promise
        .then(value => ({status: 'fulfilled', value}))
        .catch(reason => ({status: 'rejected', reason}))
    )
));

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    await notifee.incrementBadgeCount();
});

notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification} = detail || {};
    const {data} = notification || {};
    switch (type) {
        case EventType.PRESS:
            CBNotificationHandler.onClick(null, data);
            break;
        default:
            break;
    }
});

const CBApp = CodePush({
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
    installMode: CodePush.InstallMode.IMMEDIATE
})(App);

AppRegistry.registerComponent(appName, () => CBApp);
