import { reduxForm } from 'redux-form';
<<<<<<< HEAD
import { connect } from 'react-redux';
import i18n from 'i18next';
import { translate } from 'react-i18next';
import isEmail from 'sane-email-validation';

=======
import i18n from 'i18next';
import { translate } from 'react-i18next';
import isEmail from 'sane-email-validation';
>>>>>>> Splits up form html and container
import EmailSigninForm from 'presentationals/components/email-signin/EmailSigninForm';

import { emailSigninUser } from 'actions/signinActions';

<<<<<<< HEAD
=======
import history from '../../history';

>>>>>>> Splits up form html and container
export function validate(values) {
  const { email, password } = values;

  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = i18n.t('formErrors:emailRequired');
<<<<<<< HEAD
  } else if (!isEmail(email.trim())) {
=======
  } else if (!isEmail(email)) {
>>>>>>> Splits up form html and container
    errors.email = i18n.t('formErrors:emailInvalid');
  }

  if (!password || password.trim() === '') {
    errors.password = i18n.t('formErrors:passwordRequired');
  }

  return errors;
}

function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(emailSigninUser({ values, resolve, reject }));
  });
}

<<<<<<< HEAD
const connectedForm = reduxForm({
=======
export default reduxForm({
>>>>>>> Splits up form html and container
  form: 'emailSignin',
  validate,
  onSubmit: validateAndSubmit,
  getFormState: state => state.vendor.forms,
<<<<<<< HEAD
})(translate()(EmailSigninForm));

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

export default connect(mapStateToProps)(connectedForm);
=======
  onSubmitSuccess: () => history.push('/app'),
})(translate()(EmailSigninForm));
>>>>>>> Splits up form html and container
