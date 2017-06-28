import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import history from 'history';

import ImportDeckForm from 'presentationals/components/deckManagement/ImportDeckForm';

const createDeckReduxForm = reduxForm({
  form: 'importDeckForm',
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => history.push('/'),
})(ImportDeckForm);

function mapStateToProps(state) {
  return {
    authState: state.app.authentication,
  };
}

export default connect(mapStateToProps)(createDeckReduxForm);
