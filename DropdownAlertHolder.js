import {DropdownAlertType} from 'react-native-dropdownalert';

export default class DropdownAlertHolder {

    static alertFunc;

    static setAlertFunc(func) {
        this.alertFunc = func;
    }

    static alertWithType(...args) {
        if (this.alertFunc && typeof this.alertFunc === 'function') {
            this.alertFunc({
                type: args[0] || DropdownAlertType.Info,
                title: args[1] || '',
                message: args[2] || ''
            });
        }
    }
}
