import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import UserCollaborations from 'presentationals/components/profile-page/UserCollaborations';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';


class OwnDecks extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      this.props.startOwnCollaborationsRequests(this.props.authState.id);
    }
  }

  render() {
    const { requestsSucceeded, startedRequests, errorMessage } = this.props.ownCollaborationsState;

    const isFirstRender = !startedRequests && !requestsSucceeded && !errorMessage;
    let toDisplay;

    if (isFirstRender || startedRequests) {
      toDisplay = <p> Loading ... </p>;
    }
    else if (!this.props.ownCollaborationsState.startedRequests && this.props.ownCollaborationsState.errorMessage) {
      toDisplay = <p>{this.props.ownCollaborationsState.errorMessage}</p>;
    }
    else {
      toDisplay = (<UserCollaborations
        authState={this.props.authState}
        entities={this.props.entities}
        userId={this.props.authState.id}
      />);
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
    listOfDecks: PropTypes.array.isRequired,
  }),
  requestDeckDeletion: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }),
};

export default OwnDecks;
