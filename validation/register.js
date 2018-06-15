const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Имя должно состоять из не менее 2 и не более 30 символов";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}