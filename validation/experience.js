const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = "Поле заголовка с местом работы обязательно!";
    }

    if (Validator.isEmpty(data.company)) {
        errors.company = "Поле с предыдущим местом работы обязательно!";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "Поле с датой начала работы обязательно!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}