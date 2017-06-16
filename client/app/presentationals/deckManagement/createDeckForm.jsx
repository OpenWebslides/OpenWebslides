import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

// Fields
import inputField from 'presentationals/objects/form-fields/InputField';

// Actions
import { requestDeckCreation } from 'actions/createDeckActions';

// Helpers:
import IfAuthHOC from '../../../lib/IfAuthHOC';

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
            <Field
              component={inputField}
              label="Title:"
              name="title"
              placeholder="Title"
            />
            <Field
              component={inputField}
              label="Description:"
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

export default CreateDeckForm;
