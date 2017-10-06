import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function DeckThumbnail({
  deckTitle,
  deckId,
  deleteDeck,
}) {
  return (
    <tr className="c_deck-thumbnail">
      <th>
        <p className="c_deck-thumbnail__deck-name">
          {deckTitle}
        </p>
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
      <th>
        <Link to={`/editor/${deckId}`}>
          <p className="c_deck-thumbnail__deck-edit-link">
              Edit
            </p>
        </Link>
      </th>
      <th>
        <button
          className="c_deck-thumbnail__delete-button"
          onClick={() => {
            deleteDeck(deckId);
          }}
        >
          Delete
        </button>
      </th>
    </tr>
  );
}

DeckThumbnail.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  deckId: PropTypes.number.isRequired,
  deckIconImage: PropTypes.string,
  deleteDeck: PropTypes.func.isRequired,
};

DeckThumbnail.defaultProps = {
  deckIconImage:
    'https://www.iconfinder.com/data/icons/penthemes-layour-builder/512/slider-128.png', //  TODO : add a dummy image
  deckLink: '#',
};

export default DeckThumbnail;
