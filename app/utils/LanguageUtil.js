const capitalizeFirstLetter = string => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeWordLetter = string => {
    if (!string) return '';
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const removeAlias = string => {
    if (!string) return '';
    let alias = string;
    alias = alias.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    alias = alias.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    alias = alias.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    alias = alias.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    alias = alias.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    alias = alias.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    alias = alias.replace(/đ/g, 'd');
    alias = alias.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    alias = alias.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    alias = alias.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    alias = alias.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    alias = alias.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    alias = alias.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    alias = alias.replace(/Đ/g, 'D');
    alias = alias.replace(/[^\x00-\x7F]/g, '');
    return alias;
};

const indexesOf = (string, regex) => {
    let match, indexes = [];
    while (match = regex.exec(string)) {
        indexes.push(match.index);
    }
    return indexes;
};

const isSecure = (string, value) => {
    return value ? string : '*'.repeat(string.length);
};

const isAlias = (string, value) => {
    return value ? string : removeAlias(string);
};

export {
    capitalizeFirstLetter,
    capitalizeWordLetter,
    removeAlias,
    indexesOf,
    isSecure,
    isAlias
};
