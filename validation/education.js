const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (Validator.isEmpty(data.school)) {
        errors.school = "Поле школы в которой вы учились обязательно!";
    }

    if (Validator.isEmpty(data.degree)) {
        errors.degree = "Это поле  обязательно!";
    }

    if (Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "Поле о том, какая у вас специальность обязательно!";
    }

    if (Validator.isEmpty(data.from)) {
        errors.from = "Поле с датой поступления обязательно!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}