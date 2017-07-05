import React from 'react';
import PropTypes from 'prop-types';
import fileSizeDisplay from 'lib/fileSizeDisplay';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

// Helpers:
import IfAuthHOC from '../../../../lib/IfAuthHOC';

function ImportDeckForm({ authState, deckImportState }) {
  const uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false,
      },
      deleteFile: {
        enabled: false,
      },
      request: {
        endpoint: '/conversions',
      },
      retry: {
        enableAuto: false,
      },
    },
  });

  return (
    <IfAuthHOC
      isAuthenticated={authState}
      fallback={() => <NeedSigninWarning requestedAction="import a deck" />}
    >
      <Gallery uploader={uploader} />
    </IfAuthHOC>
  );
}

ImportDeckForm.propTypes = {
  authState: PropTypes.shape({
    id: PropTypes.string,
  }),
  deckImportState: PropTypes.shape({
    selectedFile: PropTypes.object,
    uploadStarted: PropTypes.bool,
    uploadPercent: PropTypes.number,
    uploadErrorMessage: PropTypes.string,
    uploadSucceeded: PropTypes.bool,
    importStarted: PropTypes.bool,
    importSucceeded: PropTypes.bool,
    importError: PropTypes.string,
  }),
  selectUploadFile: PropTypes.func.isRequired,
};

ImportDeckForm.defaultProps = {
  authState: null,
};

export default ImportDeckForm;
