import React from 'react';
import PropTypes from 'prop-types';
import fileSizeDisplay from 'lib/fileSizeDisplay';
// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';

// Helpers:
import IfAuthHOC from '../../../../lib/IfAuthHOC';

function ImportDeckForm({ authState, deckImportState, selectUploadFile }) {
  let fileInfo;

  if (deckImportState.selectedFile.name) {
    fileInfo = (
      <div>
        <p>
          You have selected: {deckImportState.selectedFile.name}.
        </p>
        <p>
          File size: {fileSizeDisplay(deckImportState.selectedFile.size)}
        </p>
      </div>
    );
  } else {
    fileInfo = (
      <div>
        <p>
          Please select a file to import
        </p>
      </div>
    );
  }

  return (
    <IfAuthHOC
      isAuthenticated={authState}
      fallback={() => <NeedSigninWarning requestedAction="import a deck" />}
    >
      <div>
        <input
          type="file"
          accept="pdf/ppt"
          onChange={e => {
            selectUploadFile(e.target.files[0]);
          }}
        />
        {fileInfo}
        <button type="submit"> Upload Deck</button>
      </div>
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
