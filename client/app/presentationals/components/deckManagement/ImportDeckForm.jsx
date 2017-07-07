import React from 'react';
import PropTypes from 'prop-types';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';
import { getAuthToken } from 'api/helpers/apiHelper';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';

function ImportDeckForm({ authState, fineUploaderState, importUploadError }) {
  const uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false,
      },
      deleteFile: {
        enabled: false,
      },
      request: {
        endpoint: 'http://localhost:3000/api/conversions',
        customHeaders: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
      validation: {
        allowedExtensions: ['pptx', 'pdf'],
        sizeLimit: 512000000, // 500mb
      },
      retry: {
        enableAuto: false,
      },
      callbacks: {
        onError(id, name, err) {
          debugger;
          importUploadError(name, err);
        },
      },
    },
  });

  let errorsDisplay = '';
  if (fineUploaderState.errors.length > 0) {
    errorsDisplay = fineUploaderState.errors.map(err =>
      <li>
        Error: {err}
      </li>,
    );
  }

  return (
    <IfAuthHOC
      isAuthenticated={authState.isAuthenticated}
      fallback={() => <NeedSigninWarning requestedAction="import a deck" />}
    >
      <div>
        <Gallery uploader={uploader} />
        {errorsDisplay}
      </div>
    </IfAuthHOC>
  );
}

ImportDeckForm.propTypes = {
  authState: PropTypes.shape({
    id: PropTypes.string,
  }),
};

ImportDeckForm.defaultProps = {
  authState: null,
};

export default ImportDeckForm;
