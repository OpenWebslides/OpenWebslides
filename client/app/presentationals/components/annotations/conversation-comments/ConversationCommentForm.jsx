import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';

function ConversationCommentForm(props) {
  const { rows, cols, label, submitText, autoFocus, cancelAction } = props;

  if (props.submitSucceeded) {
    props.reset();
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>

        <div>
          { label && <label>{label}</label>}

          <div>
            <Field
              component={TextAreaField}
              rows={rows}
              cols={cols}
              name="text"
              autoFocus={autoFocus}
            />
          </div>
        </div>

        {props.error && <strong>{props.error}</strong>}

        <div>
          <button className="send-btn" type="submit">
            <i className="fa fa-paper-plane fa-6" aria-hidden="true" />
          </button>
          { cancelAction && <button className="cancel-btn" onClick={cancelAction}><i className="fa fa-chevron-left fa-6" aria-hidden="true" /></button>}
        </div>

      </form>
    </div>
  );
}

function validate(values) {
  const { text } = values;

  const errors = {};

  if (!text || text.trim() === '') {
    errors.text = 'Text is required.';
  }

  return errors;
}

export default reduxForm({
  form: 'conversationComment',
  validate,
  getFormState: state => state.vendor.forms,
})(ConversationCommentForm);


ConversationCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  rows: PropTypes.number,
  cols: PropTypes.number,
  submitText: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  cancelAction: PropTypes.func,
};

ConversationCommentForm.defaultProps = {
  error: '',
  label: null,
  rows: 20,
  cols: 40,
  submitText: 'Submit',
  autoFocus: false,
  cancelButton: false,
  cancelAction: null,
};
