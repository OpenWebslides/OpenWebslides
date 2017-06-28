import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

// Actions
import { requestDeckImport } from 'actions/importDeckActions';

// Helpers:
import IfAuthHOC from '../../../../lib/IfAuthHOC';

// Submit Validation
function validateAndSubmit(values, dispatch) {
  return new Promise((resolve, reject) => {
    dispatch(requestDeckImport({ values, resolve, reject }));
  });
}

function ImportDeckForm({ authState, handleSubmit }) {
  return (
    <IfAuthHOC
      isAuthenticated={authState}
      fallback={() => <NeedSigninWarning requestedAction="create a deck" />}
    >
      <div>
        <form onSubmit={handleSubmit(validateAndSubmit)}>
          <input type="file" accept="pdf/ppt" />
          <button type="submit"> Upload Deck</button>
        </form>
      </div>
    </IfAuthHOC>
  );
}

ImportDeckForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
  }),
};

ImportDeckForm.defaultProps = {
  authState: null,
};

export default ImportDeckForm;
