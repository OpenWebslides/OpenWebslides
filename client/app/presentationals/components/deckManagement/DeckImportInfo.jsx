import React from 'react';
import PropTypes from 'prop-types';
import intervalFromNow from 'lib/dateDisplay';

export function DeckImportInfo({ timestamp, format, status, title }) {
  const className = `c_deck-import-info is__${format} is_${status}`;

  const date = new Date(timestamp * 1000);
  const displayDate = intervalFromNow(date);

  return (
    <li className={className}>
      <div>
        <h3>
          {title}
        </h3>
        <p>
          Uploaded: {displayDate} ago.
        </p>
        <p>
          Status: {status}
        </p>
      </div>
    </li>
  );
}

DeckImportInfo.propTypes = {
  timestamp: PropTypes.string.isRequired,
  format: PropTypes.oneOf(['ppt', 'pdf']).isRequired,
  status: PropTypes.oneOf(['queued', 'processing', 'success', 'error'])
    .isRequired,
  title: PropTypes.string.isRequired,
};

export default DeckImportInfo;
