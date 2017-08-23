import { reduxForm } from 'redux-form';

import { addConversationComment } from 'actions/entities/conversation-comments';

import ConversationCommentForm from 'presentationals/components/annotations/conversation-comments/ConversationCommentForm';

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(addConversationComment({ values, resolve, reject }));
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
  form: 'conversationComment',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(ConversationCommentForm);

