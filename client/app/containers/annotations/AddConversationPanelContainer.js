import { reduxForm } from 'redux-form';

import AddConversationPanel from 'presentationals/components/annotations/AddConversationPanel';
import { addConversationToSlide } from 'actions/entities/conversations';


function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(addConversationToSlide({ values, resolve, reject }));
  });
}

export default reduxForm({
  form: 'conversation',
  onSubmit: validateAndSubmit,
  initialValues: { conversationType: 'question' },
  getFormState: state => state.vendor.forms,
})(AddConversationPanel);
