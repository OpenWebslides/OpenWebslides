import React from 'react';
import PropTypes from 'prop-types';

export function DeckThumbnail({ deckTitle, deckIconImage, deckLink }) {
  const altIconText = `Icon of deck: ${deckTitle}`;
  return (
    <li>
      <div className="c_deck-thumbnail">
        <a href={deckLink}>
          <img src={deckIconImage} alt={altIconText} />
          <p>{deckTitle}</p>
          <button onClick=""> Delete </button>
        </a>
      </div>
    </li>
  );
}

DeckThumbnail.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  deckIconImage: PropTypes.string,
  deckLink: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

DeckThumbnail.defaultProps = {
  deckIconImage: 'https://www.iconfinder.com/data/icons/penthemes-layour-builder/512/slider-128.png', //  TODO : add a dummy image
};

export default DeckThumbnail;
