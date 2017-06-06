import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Presentationals:
import NeedSigninWarning from 'presentationals/NeedSigninWarning';

// Fields
import inputField from 'presentationals/formFields/InputField';

// Actions
import { requestDeckCreation } from 'actions/createDeckActions';

// Helpers:
import IfAuthHOC from '../../lib/IfAuthHOC';

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

// Submit Validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(requestDeckCreation({ values, resolve, reject }));
  });
}

class CreateDeckForm extends Component {
  render() {
    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState}
        fallback={() => <NeedSigninWarning requestedAction="create a deck" />}
      >
        <div>
          <form onSubmit={this.props.handleSubmit(validateAndSubmit)}>
            <Field component={inputField} name="title" placeholder="Title" />
            <Field
              component={inputField}
              name="description"
              placeholder="Description"
            />
            <button type="submit"> Create Deck</button>
          </form>
        </div>
      </IfAuthHOC>
    );
  }
}

CreateDeckForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
  }),
};

CreateDeckForm.defaultProps = {
  authState: null,
};

const createDeckReduxForm = reduxForm({
  form: 'createDeckForm',
  validate,
  getFormState: state => state.vendor.forms,
  onSubmitSuccess: () => browserHistory.push('/'),
})(CreateDeckForm);

function mapStateToProps(state) {
  return {
    authState: state.local.auth,
  };
}

export default connect(mapStateToProps)(createDeckReduxForm);
