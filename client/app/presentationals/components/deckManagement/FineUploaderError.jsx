import React from 'react';
import PropTypes from 'prop-types';

function FineUploaderError({ error }) {
  return (
    <li>
      <p>
        Error: {error}
      </p>
    </li>
  );
}

FineUploaderError.propTypes = {
  error: PropTypes.string.isRequired,
};
export default FineUploaderError;
