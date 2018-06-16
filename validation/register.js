const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';


    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = "Имя должно состоять из не менее 2 и не более 30 символов";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Поле с именем должно быть заполнено";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Поле с email обязательно!";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "В Email допущена ошибка";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Поле с паролем обязательно!";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = "Пароль должен состоять из не менее 6 и не более 30 символов";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Подтвердите пароль!";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Пароли должны соответствовать";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}