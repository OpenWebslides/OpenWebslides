import React from 'react';
import PropTypes from 'prop-types';

function TextAreaField(props) {
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
            <textarea
              style={{ overflow: 'auto', resize: 'none' }}
              autoFocus={props.autoFocus}
              className="c_input-field__element"
              cols={props.cols}
              rows={props.rows}
              {...props.input}
              placeholder={props.placeholder}
            />
          </span>
        </label>
        {props.meta.touched && !props.meta.pristine &&
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

TextAreaField.propTypes = {
  label: PropTypes.string,
  cols: PropTypes.string,
  rows: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  input: PropTypes.objectOf(String).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    active: PropTypes.bool,
    pristine: PropTypes.bool,
    error: PropTypes.string,
    extraErrors: PropTypes.arrayOf(String),
  }).isRequired,
};

TextAreaField.defaultProps = {
  placeholder: '',
  label: '',
  autoFocus: false,
  cols: '40',
  rows: '15',
};

export default TextAreaField;
