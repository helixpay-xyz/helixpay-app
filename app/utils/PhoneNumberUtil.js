export default class PhoneNumberUtil {

    static insertCountryCode(countryCode, phoneNumber) {
        if (phoneNumber && phoneNumber.startsWith('0')) {
            return countryCode + phoneNumber.substring(1);
        } else {
            return countryCode + phoneNumber;
        }
    }

    static removeCountryCode(countryCode, phoneNumber) {
        if (phoneNumber && phoneNumber.indexOf(countryCode) === 0) {
            return '0' + phoneNumber.substring(countryCode.length);
        } else {
            return phoneNumber;
        }
    }

    static formatPhoneNumber(phoneNumber) {
        if (phoneNumber && phoneNumber.length > 9) {
            try {
                const offSize = phoneNumber.length > 10 ? 1 : 0;
                return phoneNumber.substring(0, 3 + offSize) + ' ' + phoneNumber.substring(3 + offSize, 6 + offSize) + ' ' + phoneNumber.substring(6 + offSize, phoneNumber.length);
            } catch (e) {
                return phoneNumber;
            }
        } else {
            return phoneNumber;
        }
    }

    static hiddenPhoneNumber(phoneNumber) {
        try {
            return phoneNumber.substring(0, 3) + '*'.repeat(phoneNumber.length - 6) + phoneNumber.substring(phoneNumber.length - 3);
        } catch (e) {
            return phoneNumber;
        }
    }
}
