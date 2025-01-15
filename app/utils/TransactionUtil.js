
export default class TransactionUtil {

    static toBytes32(str) {
        const paddedStr = str.padEnd(32, '\0');
        const hexString = '0x' + [...paddedStr].map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
        return hexString;
    }
}
