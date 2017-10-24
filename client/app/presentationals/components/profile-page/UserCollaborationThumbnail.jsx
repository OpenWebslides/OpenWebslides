import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function CollaborationThumbnail({ deckTitle, deckId, ownerName, ownerId }) {
  return (
    <tr className="c_deck-thumbnail">

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
            <i className="fa fa-desktop fa-6 deck-icon" aria-hidden="true" />
          </p>
        </Link>
      </th>
      <th>
        <Link to={`/print/${deckId}`}>
          <p className="c_deck-thumbnail__deck-view-print-link">
            <i className="fa fa-book fa-6 deck-icon" aria-hidden="true" />
          </p>
        </Link>
      </th>
      <th>
        <p className="c_deck-thumbnail__deck-name">
          {deckTitle}
        </p>
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
