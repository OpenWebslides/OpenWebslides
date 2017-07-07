import React from 'react';
import PropTypes from 'prop-types';
import FineUploaderError from 'presentationals/components/deckManagement/FineUploaderError';

function renderError(error) {
  return <FineUploaderError error={error} />;
}

function FineUploaderErrors({ errors }) {
  const errorElements = errors.map(er => renderError(er));

  return (
    <ol>
      {errorElements}
    </ol>
  );
}

FineUploaderErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({ error: PropTypes.string }))
    .isRequired,
};

export default FineUploaderErrors;
