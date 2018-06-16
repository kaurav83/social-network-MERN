const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = "В Email допущена ошибка";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Поле с email обязательно!";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Поле с паролем обязательно!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}