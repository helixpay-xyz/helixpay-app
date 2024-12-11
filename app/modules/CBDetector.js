import {NativeEventEmitter, NativeModules} from 'react-native';

const CBDetectorModule = NativeModules.CBDetector;
const CBDetectorEmitter = new NativeEventEmitter(CBDetectorModule);

export default class CBDetector {

    static startScreenshot() {
        CBDetectorModule.startScreenshot();
    }

    static stopScreenshot() {
        CBDetectorModule.stopScreenshot();
    }

    static onDetectorEvent(callback) {
        return CBDetectorEmitter.addListener('CBDetectorEvent', callback);
    }
};
