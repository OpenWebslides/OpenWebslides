import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';
import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';

function ConversationForm(props) {
  const {
    submitSucceeded,
    submitSucceededAction,
    includeTypeChoice,
    rows,
    cols,
    secret,
    submitText,
    cancelAction,
  } = props;

  if (submitSucceeded && submitSucceededAction) {
    submitSucceededAction();
  }

  return (
    <div>

      <form onSubmit={props.handleSubmit}>

        { includeTypeChoice && !secret && <div>
          <label>Type</label>
          <label><Field name="conversationType" component={InputField} type="radio" value="question" />Question</label>
          <label><Field name="conversationType" component={InputField} type="radio" value="note" />Note</label>
        </div> }

        <div>
          <Field
            autoFocus={true}
            component={InputField}
            name="title"
          />
        </div>

        <div>
          <Field
            component={TextAreaField}
            rows={rows}
            cols={cols}
            name="text"
          />
        </div>

        {props.error && <strong>{props.error}</strong>}

        <div>
          <button type="submit">{submitText}</button>
          <button type="button" onClick={cancelAction}>Cancel</button>
        </div>
      </form>
    </div>

  );
}

function validate(values) {
  const { text, title } = values;

  const errors = {};

  if (!text || text.trim() === '') {
    errors.text = 'Text is required.';
  }

  if (!title || title.trim() === '') {
    errors.title = 'Title is required.';
  }

  return errors;
}

export default reduxForm({
  form: 'conversationForm',
  validate,
  getFormState: state => state.vendor.forms,
})(ConversationForm);


ConversationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  includeTypeChoice: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  cancelAction: PropTypes.func.isRequired,
  submitSucceededAction: PropTypes.func,
  submitText: PropTypes.string,

};

ConversationForm.defaultProps = {
  error: '',
  includeTypeChoice: true,
  cols: 40,
  rows: 13,
  submitSucceededAction: null,
  submitText: 'Submit',
};
