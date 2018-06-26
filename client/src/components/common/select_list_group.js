import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import NativeSelect from '@material-ui/core/NativeSelect';

const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map((option) => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ))
    return (
        <div className="form-group input-group">
            <NativeSelect
                className={classnames('form-control', {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </NativeSelect>    
            {info && <small className="form-text">{info}</small>}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectListGroup;


