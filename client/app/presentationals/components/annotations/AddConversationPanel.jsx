import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import InputField from 'presentationals/objects/form-fields/InputField';


function AddConversationPanel(props) {
  return (
    <div>
      <a href="#" className="back-btn" onClick={props.closeAddConversationPanel}><i className="fa fa-chevron-left fa-6" aria-hidden="true" /></a>
      <h3><strong>Add conversation</strong></h3>

      <form onSubmit={props.handleSubmit}>

        <div>
          <label>Type</label>
          <label><Field name="conversationType" component={InputField} type="radio" value="question" />Question</label>
          <label><Field name="conversationType" component={InputField} type="radio" value="note" />Note</label>
        </div>

        <div>
          <label>Title</label>
          <div>
            <Field
              autoFocus={true}
              component={InputField}
              name="title"
            />
          </div>
        </div>

        <div>
          <label>Text</label>
          <div>
            <Field
              component="textarea"
              style={{ overflow: 'auto', resize: 'none' }}
              rows="13"
              cols="40"
              name="text"
            />
          </div>
        </div>
        <div>
          <button type="submit">Add Conversation</button>
        </div>
      </form>
    </div>
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
