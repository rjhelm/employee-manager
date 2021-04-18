const validator = require('validator');

const validate = {
    isString(str) {
        return str !== '' || 'Enter valid resposnse';
    },
    salaryNumber(num) {
        if (validator.isDecimal(num)) return true;
        return 'Enter valid salary number';
    },
    stringSame(str1, str2) {
        if (str1 === str2) return true;
    }
}

module.exports = validator;