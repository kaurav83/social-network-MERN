import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import TextField from "@material-ui/core/TextField";

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group" style={{ width: "20rem" }}>
            <TextField
                placeholder={placeholder}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
                multiline
                fullWidth
                margin="normal"
            />
            {info && <small className="form-text">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;


