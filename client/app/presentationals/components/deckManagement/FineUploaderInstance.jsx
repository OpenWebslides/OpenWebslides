import React from 'react';
import PropTypes from 'prop-types';

import FineUploaderTraditional from 'fine-uploader-wrappers';
import Gallery from 'react-fine-uploader';
import { getAuthToken } from 'api/helpers/apiHelper';

import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import IfAuthHOC from 'lib/IfAuthHOC';
import defaults from 'config/api';


function FineUploaderInstance({ isAuthenticated, importUploadError }) {
  const uploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false,
      },
      deleteFile: {
        enabled: false,
      },
      request: {
        endpoint: `${defaults.url}conversions/`,
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
          let error = err;
          if (name.match(/\.ppt$/)) {
            error =
              'The converter doesn\'t support ".ppt" files. Please open your presentation in powerpoint and save it as ".pptx" before importing it.';
          }
          importUploadError(name, error);
        },
      },
    },
  });
  return (
    <IfAuthHOC
      isAuthenticated={isAuthenticated}
      fallback={() => <NeedSigninWarning requestedAction="import a deck" />}
    >
      <Gallery uploader={uploader} />
    </IfAuthHOC>
  );
}

FineUploaderInstance.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  importUploadError: PropTypes.func.isRequired,
};
export default FineUploaderInstance;
