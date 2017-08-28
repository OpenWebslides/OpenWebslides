import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';
import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';

// TODO: CLEAN UP THIS CRAP
function AddConversationPanel(props) {
  return (
    <form onSubmit={props.handleSubmit}>

      <div>
        <label>Type</label>
        <label><Field name="conversationType" component={InputField} type="radio" value="question" />Question</label>
        <label><Field name="conversationType" component={InputField} type="radio" value="note" />Note</label>
      </div>

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
          rows="5"
          cols="30"
          name="text"
        />
      </div>
      {props.error && <strong>{props.error}</strong>}
      <div>
        <button type="submit">Save</button>
        <button onClick={this.unsetEditingConversation}>Cancel</button>
      </div>
    </form>
  );
}


AddConversationPanel.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  closeAddConversationPanel: PropTypes.func.isRequired,
};

AddConversationPanel.defaultProps = {
  error: '',
};

export default AddConversationPanel;
