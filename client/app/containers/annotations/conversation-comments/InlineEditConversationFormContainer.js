import { reduxForm } from 'redux-form';

import { updateConversation } from 'actions/entities/conversations';
import InlineEditConversationForm from 'presentationals/components/annotations/conversation-comments/InlineEditConversationForm';

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(updateConversation({ values, resolve, reject }));
  });
}

function validate(values) {
  const { text, title } = values;

  const errors = {};

  if (!text || text.trim() === '') {
    errors.text = 'Text is required.';
  }

  if (!text || title.trim() === '') {
    errors.title = 'Title is required.';
  }

  return errors;
}

export default reduxForm({
  form: 'inlineEditConversation',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
})(InlineEditConversationForm);

