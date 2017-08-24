import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import TextAreaField from 'presentationals/objects/form-fields/TextAreaField';

export default function InlineEditConversationCommentForm(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            autoFocus={true}
            component={TextAreaField}
            rows="5"
            cols="30"
            name="text"
          />
        </div>

        {props.error && <strong>{props.error}</strong>}

        <div>
          <button type="submit">Save</button>
        </div>

      </form>
    </div>
  );
}


InlineEditConversationCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
};

InlineEditConversationCommentForm.defaultProps = {
  error: '',
};
