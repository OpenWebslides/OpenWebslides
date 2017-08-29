import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';
import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';

function ConversationForm(props) {
  const { includeTypeChoice, rows, cols, cancelAction, submitText } = props;
  return (
    <form onSubmit={props.handleSubmit}>

      { includeTypeChoice && <div>
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
        { cancelAction && <button onClick={cancelAction}>Cancel</button>}
      </div>
    </form>
  );
}


ConversationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  cooseCOnversationForm: PropTypes.func.isRequired,
  includeTypeChoice: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  cancelAction: PropTypes.number,
  submitText: PropTypes.number,

};

ConversationForm.defaultProps = {
  error: '',
  includeTypeChoice: true,
  cols: 40,
  rows: 13,
  cancelAction: null,
  submitText: 'Submit',
};

export default ConversationForm;
