import React from 'react';
import PropTypes from 'prop-types';

function InputField(props) {
  // #TODO test this
  let errors;
  if (props.meta.extraErrors) {
    errors = (
      <ul>
        {props.meta.error && <li>{props.meta.error}</li>}
        {props.meta.extraErrors.map(error => <li>{error}</li>)}
      </ul>
    );
  }
  else {
    errors = <p>{props.meta.error}</p>;
  }
  return (
    <div className="c_input-field">
      <div className="c_input-field__wrapper">
        <label className="c_input-field__widget">
          {props.label && <span className="c_input-field__label">{props.label}</span>}
          <span className="c_input-field__object">
            <input
              autoFocus={props.autoFocus}
              className="c_input-field__element"
              {...props.input}
              type={props.type}
              placeholder={props.placeholder}
            />
          </span>
        </label>
        {props.meta.touched &&
          props.meta.error &&
          <span className="c_input-field__error">
            <span className="c_input-field__error__wrapper">
              {errors}
            </span>
          </span>}
      </div>
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  input: PropTypes.objectOf(String).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.string,
    extraErrors: PropTypes.arrayOf(String),
  }).isRequired,
};

InputField.defaultProps = {
  type: 'text',
  placeholder: '',
  label: '',
  autoFocus: false,
};

export default InputField;
