var numeral = require('numeral');

export default class FormatUtil {

    static formatShortCurrencyToNumber(string) {
        const number = String(string).replace(/\D/g, ',');
        if (number && number.length > 0) {
            return numeral(number).value();
        }
        return 0;
    }

    static formatNumberShortCurrency(number) {
        const currency = Number(number);
        if (currency && currency > 0) {
            return numeral(currency).format('0,0').replace(/\D/g, '.');
        }
        return '0';
    }

    static formatNumber(number) {
        const round = Math.round(number * 100) / 100;
        if (round >= 1000000000) {
            return (round / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        } else if (round >= 1000000) {
            return (round / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (round >= 1000) {
            return (round / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else {
            return round;
        }
    }

    static formatLabel(label) {
        if (label) {
            const count = 3 - (label.length % 3);
            return `${count < 3 ? ' '.repeat(count) : ''}${label}`.match(/.{1,3}/g).join('.').trim();
        }
        return label;
    }
}
