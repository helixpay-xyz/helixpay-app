import moment from 'moment';

export default class TimeUtil {

    static getTimezone() {
        return moment().utcOffset() / 60;
    }

    static getUnix() {
        return moment().unix();
    }

    static getCurrentMillisecond() {
        const now = moment().format('HH:mm');
        return moment(now, 'HH:mm').valueOf();
    }

    static getCurrentUnix() {
        const now = moment().format('HH:mm');
        return moment(now, 'HH:mm').unix();
    }

    static getCurrent() {
        return moment().format('HH:mm');
    }

    static getPrevious(amount, unit) {
        return moment().subtract(amount, unit).format('HH:mm');
    }

    static getNext(amount, unit) {
        return moment().add(amount, unit).format('HH:mm');
    }

    static convert(time, inputFormat, outputFormat = 'HH:mm') {
        return moment(time, inputFormat).format(outputFormat);
    }

    static utc(time, outputFormat = 'HH:mm') {
        return moment.utc(time).format(outputFormat);
    }

    static convertLocal(time) {

    }

    static day(time, format = 'HH:mm') {
        return moment(time, format).day();
    }

    static unix(time, format = 'HH:mm') {
        return moment(time, format).unix();
    }

    static millisecond(time, format = 'HH:mm') {
        return moment(time, format).valueOf();
    }

    static add(time, amount, unit) {
        return moment(time, 'HH:mm').add(amount, unit).format('HH:mm');
    }

    static subtract(time, amount, unit) {
        return moment(time, 'HH:mm').subtract(amount, unit).format('HH:mm');
    }

    static compare(begin, from, to, end) {
        const b = moment(begin, 'HH:mm').unix();
        const f = moment(from, 'HH:mm').unix();
        const t = moment(to, 'HH:mm').unix();
        const e = moment(end, 'HH:mm').unix();
        return b <= f && f <= t && t <= e;
    }

    static array(begin, end) {
        const b = moment(begin, 'HH:mm').add(1, 'minutes');
        const e = moment(end, 'HH:mm');
        let array = [], f = b.clone();
        while (f < e) {
            array.push(f.format('HH:mm'));
            f = f.add(1, 'minutes');
        }
        return array;
    }

    static diff(begin, end, unit = 'minutes') {
        const b = moment(begin, 'HH:mm');
        const e = moment(end, 'HH:mm');
        return b.diff(e, unit);
    }

    static startOf(time, unit) {
        return moment(time, 'HH:mm').startOf(unit).format('HH:mm');
    }

    static endOf(time, unit) {
        return moment(time, 'HH:mm').endOf(unit).format('HH:mm');
    }

    static getHalfStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return moment(millisecond).format('HH:mm');
    }

    static getQuarterStringFromMillisecond(millisecond) {
        if (!millisecond) return '';
        return moment(millisecond).format('HH');
    }

    static getHalfString(time) {
        if (!time) return '';
        return moment(time, 'HH:mm').format('HH:mm');
    }

    static getQuarterString(time) {
        if (!time) return '';
        return moment(time, 'HH:mm').format('HH');
    }

    static isBetweenInclusive(time, begin, end) {
        const t = moment(time, 'HH:mm');
        const b = moment(begin, 'HH:mm');
        const e = moment(end, 'HH:mm');
        return t >= b && t <= e;
    }
}
