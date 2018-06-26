import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Input from "@material-ui/core/TextField";

const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
    return (
        <div className="form-group input-group" style={{display: "flex", alignItems: "center"}}>
            <div className="input-group-pretend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>
            <Input
                placeholder={placeholder}
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: 'text'
};

export default InputGroup;


