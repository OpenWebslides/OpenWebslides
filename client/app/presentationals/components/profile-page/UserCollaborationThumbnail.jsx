import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function CollaborationThumbnail({ deckTitle, deckId, ownerName, ownerId }) {
  return (
    <tr className="c_deck-thumbnail">
      <th>
        <p className="c_deck-thumbnail__deck-name">
          {deckTitle}
        </p>
      </th>
      <th>
        <Link to={`/user/${ownerId}`}>
          <p className="c_deck-thumbnail__owner-name">
            {ownerName}
          </p>
        </Link>
      </th>
      <th>
        <Link to={`/presentation/${deckId}`}>
          <p className="c_deck-thumbnail__deck-view-link">
            View
          </p>
        </Link>
      </th>
      <th>
        <Link to={`/print/${deckId}`}>
          <p className="c_deck-thumbnail__deck-view-print-link">
            Course mode
          </p>
        </Link>
      </th>
    </tr>
  );
}

CollaborationThumbnail.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
};

export default CollaborationThumbnail;
