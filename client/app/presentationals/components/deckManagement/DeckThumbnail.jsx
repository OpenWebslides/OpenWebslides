import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

function DeckThumbnail(props) {
  const { deckTitle, deckId, deckIconImage, deleteDeck, history } = props;
  const altIconText = `Icon of deck: ${deckTitle}`;

  return (
    <li>
      <div className="c_deck-thumbnail">
        <Link to={`/presentation/${deckId}`}>
          <img src={deckIconImage} alt={altIconText} />
          <p>{deckTitle}</p>
        </Link>
        <button
          onClick={() => history.push(`/editor/${deckId}`)}
        >
          Edit
        </button>
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

export default withRouter(DeckThumbnail);
