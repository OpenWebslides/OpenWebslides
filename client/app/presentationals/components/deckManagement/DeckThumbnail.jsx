import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function DeckThumbnail({ deckTitle, deckId, deckIconImage, deleteDeck }) {
  const altIconText = `Icon of deck: ${deckTitle}`;
  return (
    <li>
      <div className="c_deck-thumbnail">
        <Link to={`/editor/${deckId}`}>
          <img src={deckIconImage} alt={altIconText} />
          <p>{deckTitle}</p>
        </Link>
        <button
          onClick={() => {
            deleteDeck(deckId);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

DeckThumbnail.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  deckIconImage: PropTypes.string,
  deckLink: PropTypes.string,
  deleteDeck: PropTypes.func.isRequired,
};

DeckThumbnail.defaultProps = {
  deckIconImage: 'https://www.iconfinder.com/data/icons/penthemes-layour-builder/512/slider-128.png', //  TODO : add a dummy image
  deckLink: '#',
};

export default DeckThumbnail;
