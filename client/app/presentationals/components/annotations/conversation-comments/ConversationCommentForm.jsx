import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';


export default function ConversationCommentForm(props) {
  if (props.submitSucceeded) {
    props.reset();
  }

  return (
    <div>
      <form onSubmit={props.handleSubmit}>

        <div>
          <label>Text</label>

          <div>
            <Field
              component={TextAreaField}
              rows="13"
              cols="40"
              name="text"
            />
          </div>
        </div>

        {props.error && <strong>{props.error}</strong>}

        <div>
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  );
}


ConversationCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
};

ConversationCommentForm.defaultProps = {
  error: '',
};
