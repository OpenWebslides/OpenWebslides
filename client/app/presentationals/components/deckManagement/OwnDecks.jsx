import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import { DeckThumbnail } from 'presentationals/components/deckManagement/DeckThumbnail';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';
import RequestStatusHOC from 'lib/RequestsStatusHOC';

function renderDeckThumbnail(el, deleteDeck, isDeletionPending, deletionError) {
  return (
    <DeckThumbnail
      key={el.id}
      deckId={el.id}
      deckTitle={el.meta.title}
      deleteDeck={deleteDeck}
      deletionPending={isDeletionPending}
      deletionError={deletionError}
    />
  );
}

class OwnDecks extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      this.props.ownDecksRequestsStart(this.props.authState.id);
    }
  }

  render() {
    const {
      requestsStatus,
      errorMessage,
      deckDeletionErrors,
    } = this.props.ownDecksState;

    let toDisplay;

    if (requestsStatus === 'succeeded') {
      const user = this.props.entities.users.byId[this.props.authState.id];
      const listOfDecks = user.decks.map(id => this.props.entities.decks.byId[id]);
      let tableOrNothing;
      if (listOfDecks.length > 0) {
        const listOfDeckThumbnails = listOfDecks.map((el) => {
          const isDeletionPending = this.props.ownDecksState.deckDeletionRequested.includes(el.id);
          const deletionError = this.props.ownDecksState.deckDeletionErrors[el.id];
          return renderDeckThumbnail(
            el,
            this.props.ownDeckDeletionRequestStart,
            isDeletionPending,
            deletionError);
        });
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

      if (deckDeletionErrors.length > 0) {
        toDisplay =
        [
          toDisplay,
          deckDeletionErrors.map(err => <p className="c_own-decks--errors">{err}</p>),
        ];
      }
    }

    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState.isAuthenticated}
        fallback={() =>
          <NeedSigninWarning requestedAction="display your decks" />}
      >
        <RequestStatusHOC
          requestsStatus={requestsStatus}
          pending={() => <p> Loading your decks</p>}
          notStarted={() => <p> Loading your decks</p>}
          failed={() => <p> Error: {errorMessage}</p>}
        >
          {toDisplay}
        </RequestStatusHOC>
      </IfAuthHOC>
    );
  }
}

OwnDecks.propTypes = {
  ownDecksRequestsStart: PropTypes.func.isRequired,
  ownDecksState: PropTypes.shape({
    requestsStatus: PropTypes.string,
    errorMessage: PropTypes.string,
    deckDeletionErrors: PropTypes.object,
    deckDeletionRequested: PropTypes.arrayOf(PropTypes.string),
  }),
  ownDeckDeletionRequestStart: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
// eslint-disable-next-line react/forbid-prop-types
  entities: PropTypes.object.isRequired,
};

export default OwnDecks;
