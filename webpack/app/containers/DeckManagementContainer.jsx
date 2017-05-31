import React from 'react';
import PropTypes from 'prop-types';
import DeckThumbnail from '../presentationals/deckManagement/DeckThumbnail';

function renderDeckThumbnail(el, index) {
  return (
    <DeckThumbnail
      key={index}
      deckLink={el.deckLink}
      deckTitle={el.deckTitle}
      deckIconImage={el.deckIconImage}
    />
  );
}

class DeckManagementContainer extends React.Component {
  componentWillMount() {
    this.props.requestOwnDecks();
  }

  render() {
    const listOfDecks = this.props.ownDecksState.listOfDecks;
    const listOfDeckThumbnails = listOfDecks.map((el, index) =>
      renderDeckThumbnail(el, index),
    );

    return (
      <div className="c_deck-management-container">
        <h1> Your decks </h1>
        <div className="o_owned-decks-container">
          <ol>
            {listOfDeckThumbnails}
          </ol>
        </div>
      </div>
    );
  }
}

DeckManagementContainer.propTypes = {
  requestOwnDecks: PropTypes.func.isRequired,
};

export default DeckManagementContainer;
