import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import { DeckThumbnail } from 'presentationals/components/deckManagement/DeckThumbnail';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';

function renderDeckThumbnail(el, deleteDeck) {
  return (
    <DeckThumbnail
      key={el.id}
      deckId={el.id}
      deckTitle={el.meta.title}
      deleteDeck={deleteDeck}
    />
  );
}

class OwnDecks extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      this.props.startOwnDecksRequests(this.props.authState.id);
    }
  }

  render() {
    const {
      requestsSucceeded,
      startedRequests,
      errorMessage,
      deckDeletionErrors,
    } = this.props.ownDecksState;

    const isFirstRender = !startedRequests && !requestsSucceeded && !errorMessage;
    let toDisplay;

    if (isFirstRender || startedRequests) {
      toDisplay = <p> Loading ... </p>;
    }
    else if (!this.props.ownDecksState.startedRequests && this.props.ownDecksState.errorMessage) {
      toDisplay = <p>{this.props.ownDecksState.errorMessage}</p>;
    }
    else {
      const user = this.props.entities.users.byId[this.props.authState.id];
      const listOfDecks = user.decks.map(id => this.props.entities.decks.byId[id]);

      let tableOrNothing;
      if (listOfDecks.length > 0) {
        const listOfDeckThumbnails = listOfDecks.map(el =>
          renderDeckThumbnail(el, this.props.ownDeckDeletionRequest),
        );
        tableOrNothing = (
          <table className="c_own-decks-container__owned-decks-table">
            <tbody>
              {listOfDeckThumbnails}
            </tbody>
          </table>
        );
      }
      else {
        tableOrNothing = (<p> No decks yet! </p>);
      }
      toDisplay =
        (<div className="c_own-decks-container">
          <h1 className="c_own-decks-container__title"> Your decks: </h1>
          <div className="c_own-decks-container__owned-decks-container">
            {tableOrNothing}
            <Link to="/create_new_deck"> Add new </Link>
            <Link to="/import_deck"> Import Deck </Link>
          </div>
        </div>);
    }
    if (deckDeletionErrors.length > 0) {
      toDisplay =
      [
        toDisplay,
        deckDeletionErrors.map(err => <p className="c_own-decks--errors">{err}</p>),
      ];
    }


    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState.isAuthenticated}
        fallback={() =>
          <NeedSigninWarning requestedAction="display your decks" />}
      >
        {toDisplay}
      </IfAuthHOC>
    );
  }
}

OwnDecks.propTypes = {
  startOwnDecksRequests: PropTypes.func.isRequired,
  ownDecksState: PropTypes.shape({
    startedRequests: PropTypes.bool,
    requestsSucceeded: PropTypes.bool,
    errorMessage: PropTypes.string,
    deckDeletionErrors: PropTypes.arrayOf(PropTypes.string),
  }),
  ownDeckDeletionRequest: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
// eslint-disable-next-line react/forbid-prop-types
  entities: PropTypes.object.isRequired,
};

export default OwnDecks;
