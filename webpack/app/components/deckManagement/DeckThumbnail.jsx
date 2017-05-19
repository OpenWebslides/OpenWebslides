import React from 'react';
import PropTypes from 'prop-types';

export function DeckThumbnail({ deckTitle, deckIconImage, deckLink }) {
  const altIconText = `Icon of deck: ${deckTitle}`;
  return (
    <div className="c_deck-thumbnail">
      <a href={deckLink}>
        <img src={deckIconImage} alt={altIconText} />
        <p>{deckTitle}</p>
      </a>
    </div>
  );
}
DeckThumbnail.propTypes = {
  deckTitle: PropTypes.string.isRequired,
  deckIconImage: PropTypes.string,
  deckLink: PropTypes.string.isRequired,
};

DeckThumbnail.defaultProps = {
  deckIconImage: './dummyIcon.png', //  TODO : add a dummy image
};

export default DeckThumbnail;
