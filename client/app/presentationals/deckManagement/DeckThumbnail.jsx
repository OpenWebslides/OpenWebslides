import React from 'react';
import PropTypes from 'prop-types';

export function DeckThumbnail({
  deckTitle,
  deckId,
  deckIconImage,
  deckLink,
  deleteDeck,
}) {
  const altIconText = `Icon of deck: ${deckTitle}`;
  return (
    <li>
      <div className="c_deck-thumbnail">
        <a href={deckLink}>
          <img src={deckIconImage} alt={altIconText} />
          <p>{deckTitle}</p>
          <button
            onClick={() => {
              deleteDeck(deckId);
            }}
          >
            {' '}Delete
            {' '}
          </button>
        </a>
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
  deckIconImage:
    'https://www.iconfinder.com/data/icons/penthemes-layour-builder/512/slider-128.png', //  TODO : add a dummy image
  deckLink: '#',
};

export default DeckThumbnail;
