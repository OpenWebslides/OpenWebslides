import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import history from 'history';

import CreateDeckForm from 'presentationals/components/deckManagement/CreateDeckForm';

function validate(values) {
  const { title, description } = values;

  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'Title is required';
  } else if (title.trim().length < 6) {
    errors.title = 'Title is too short (min. 6 characters)';
  }

  if (!description || description.trim() === '') {
    errors.description = 'Description is required';
  }

  return errors;
}

const createDeckReduxForm = reduxForm({
  form: 'createDeckForm',
  validate,
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => history.push('/'),
})(CreateDeckForm);

function mapStateToProps(state) {
  return {
    authState: state.local.auth,
  };
}

export default connect(mapStateToProps)(createDeckReduxForm);
