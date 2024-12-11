import {capitalizeFirstLetter} from 'utils/LanguageUtil';
import moment from 'moment';

export default class DateUtil {

    static getDatezone() {

    }

    static getUnix() {
        return moment().unix();
    }

    static getCurrentMillisecond() {
        const now = moment().format('YYYY-MM-DD');
        return moment(now, 'YYYY-MM-DD').valueOf();
    }

    static getCurrentUnix() {
        const now = moment().format('YYYY-MM-DD');
        return moment(now, 'YYYY-MM-DD').unix();
    }

    static getCurrent() {
        return moment().format('YYYY-MM-DD');
    }

    static getPrevious(amount, unit) {
        return moment().subtract(amount, unit).format('YYYY-MM-DD');
    }

    static getNext(amount, unit) {
        return moment().add(amount, unit).format('YYYY-MM-DD');
    }

    static convert(date, inputFormat, outputFormat = 'YYYY-MM-DD') {
        return moment(date, inputFormat).format(outputFormat);
    }

    static utc(date, outputFormat = 'YYYY-MM-DD') {
        return moment.utc(date).format(outputFormat);
    }

    static convertLocal(date) {
        const regex = /\d{4}-\d{2}-\d{2}/;
        if (regex.test(date)) {
            const array = date.split('-');
            return array[2] + '/' + array[1] + '/' + array[0];
        }
        return date;
    }

    static day(date, format = 'YYYY-MM-DD') {
        return moment(date, format).day();
    }

    static unix(date, format = 'YYYY-MM-DD') {
        return moment(date, format).unix();
    }

    static millisecond(date, format = 'YYYY-MM-DD') {
        return moment(date, format).valueOf();
    }

    static add(date, amount, unit) {
        return moment(date, 'YYYY-MM-DD').add(amount, unit).format('YYYY-MM-DD');
    }

    static subtract(date, amount, unit) {
        return moment(date, 'YYYY-MM-DD').subtract(amount, unit).format('YYYY-MM-DD');
    }

    static compare(begin, from, to, end) {
        const b = moment(begin, 'YYYY-MM-DD').unix();
        const f = moment(from, 'YYYY-MM-DD').unix();
        const t = moment(to, 'YYYY-MM-DD').unix();
        const e = moment(end, 'YYYY-MM-DD').unix();
        return b <= f && f <= t && t <= e;
    }

    static array(begin, end) {
        const b = moment(begin, 'YYYY-MM-DD').add(1, 'days');
        const e = moment(end, 'YYYY-MM-DD');
        let array = [], f = b.clone();
        while (f < e) {
            array.push(f.format('YYYY-MM-DD'));
            f = f.add(1, 'days');
        }
        return array;
    }

    static diff(begin, end, unit = 'days') {
        const b = moment(begin, 'YYYY-MM-DD');
        const e = moment(end, 'YYYY-MM-DD');
        return b.diff(e, unit);
    }

    static startOf(date, unit) {
        return moment(date, 'YYYY-MM-DD').startOf(unit).format('YYYY-MM-DD');
    }

    static endOf(date, unit) {
        return moment(date, 'YYYY-MM-DD').endOf(unit).format('YYYY-MM-DD');
    }

    static getHalfStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return capitalizeFirstLetter(moment(millisecond).format('dddd, DD/MM/YYYY'));
    }

    static getQuarterStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return moment(millisecond).format('DD/MM/YYYY');
    }

    static getHalfString(date) {
        if (!date) return '';
        return capitalizeFirstLetter(moment(date, 'YYYY-MM-DD').format('dddd, DD/MM/YYYY'));
    }

    static getQuarterString(date) {
        if (!date) return '';
        return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
    }

    static isBetweenInclusive(date, begin, end) {
        const t = moment(date, 'YYYY-MM-DD');
        const b = moment(begin, 'YYYY-MM-DD');
        const e = moment(end, 'YYYY-MM-DD');
        return t >= b && t <= e;
    }
}
