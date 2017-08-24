import { reduxForm } from 'redux-form';

import { updateConversationComment } from 'actions/entities/conversation-comments';
import InlineEditConversationCommentForm from 'presentationals/components/annotations/conversation-comments/InlineEditConversationCommentForm';

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(updateConversationComment({ values, resolve, reject }));
  });
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
  form: 'inlineEditConversationComment',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(InlineEditConversationCommentForm);

