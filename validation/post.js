const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "Пост должен состоять из не менее 10 и не более 300  символов";
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Поле с текстом обязательно!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}