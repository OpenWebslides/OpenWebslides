import { reduxForm } from 'redux-form';

import AddConversationForm from 'presentationals/components/annotations/conversations/AddConversationForm';
import { addConversation } from 'actions/entities/conversations';

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(addConversation({ values, resolve, reject }));
  });
}

function validate(values) {
  const { text, title } = values;

  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'A title is required.';
  }

  if (!text || text.trim() === '') {
    errors.text = 'A description is required.';
  }

  return errors;
}

export default reduxForm({
  form: 'conversation',
  validate,
  onSubmit: validateAndSubmit,
  initialValues: { conversationType: 'question' },
  getFormState: state => state.vendor.forms,
})(AddConversationForm);

