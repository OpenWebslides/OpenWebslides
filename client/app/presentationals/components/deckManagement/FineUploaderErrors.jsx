import React from 'react';
import PropTypes from 'prop-types';
import FineUploaderError from 'presentationals/components/deckManagement/FineUploaderError';

function renderError(error, index) {
  return <FineUploaderError key={index} error={error} />;
}

function FineUploaderErrors({ errors }) {
  const errorElements = errors.map((er, index) => renderError(er, index));

  return (
    <ol className="c_fine-uploader-errors-containers">
      {errorElements}
    </ol>
  );
}

FineUploaderErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FineUploaderErrors;
