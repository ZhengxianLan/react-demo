import React from 'react';
import classnames from 'classnames';

export default function TextFieldGroup({
  field,
  value,
  label,
  error,
  type,
  onChange,
  checkUserExists,
  clearError
}){
  return (

        <div className={classnames('form-group',{'has-error':error})}>
          <label className="control-label" htmlFor={field}>{label}</label>
          <input type={type}
            onChange={onChange}
            onBlur={checkUserExists}
            onFocus={clearError}
            value={value}
            name={field}
            className='form-control'
          />
          {error&&<span className='help-block'>{error}</span>}
        </div>
);
}


TextFieldGroup.propTypes = {
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  clearError: React.PropTypes.func,
  onBlur: React.PropTypes.func,
}

TextFieldGroup.defaultProps = {
  type:'text'
}
