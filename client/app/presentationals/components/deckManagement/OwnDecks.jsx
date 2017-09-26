import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import DeckThumbnail from 'presentationals/components/deckManagement/DeckThumbnail';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';

function renderDeckThumbnail(el, deleteDeck) {
  return (
    <DeckThumbnail
      key={el.id}
      deckId={el.id}
      deckLink={el.deckLink}
      deckTitle={el.name}
      deckIconImage={el.deckIconImage}
      deleteDeck={deleteDeck}
    />
  );
}

class OwnDecks extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      this.props.requestOwnDecks(this.props.authState.id);
    }
  }

  render() {
    const listOfDecks = this.props.ownDecksState.listOfDecks;
    const listOfDeckThumbnails = listOfDecks.map(el =>
      renderDeckThumbnail(el, this.props.requestDeckDeletion),
    );
    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState.isAuthenticated}
        fallback={() =>
          <NeedSigninWarning requestedAction="display your decks" />}
      >
        <div className="c_deck-management-container">
          <h1 className="c_deck-management-container__title"> Your decks: </h1>
          <div className="c_deck-management-container__owned-decks-container">
            <table className="c_deck-management-container__owned-decks-table">
              <tbody>
                {listOfDeckThumbnails}
              </tbody>
            </table>
            <Link to="/create_new_deck"> Add new </Link>
            <Link to="/import_deck"> Import Deck </Link>
          </div>
        </div>
      </IfAuthHOC>
    );
  }
}

OwnDecks.propTypes = {
  requestOwnDecks: PropTypes.func.isRequired,
  ownDecksState: PropTypes.shape({
    listOfDecks: PropTypes.array.isRequired,
  }),
  requestDeckDeletion: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

export default OwnDecks;
