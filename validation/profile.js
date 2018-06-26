const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Это поле должно состоять из не менее 2 и не более 40 символов';
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Это поле обязательно для заполнения';
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Поле статуса обязательно';
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Поле навыков обязательно';
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.vk)) {
        if (!Validator.isURL(data.vk)) {
            errors.vk = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = 'Нет актуального URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Нет актуального URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}