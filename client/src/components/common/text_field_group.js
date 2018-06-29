import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';

const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <Input
                type={type}
                placeholder={placeholder}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {info && <small className="form-text">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.any
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;