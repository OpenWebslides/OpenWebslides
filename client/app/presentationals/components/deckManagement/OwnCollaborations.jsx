import React from 'react';
import PropTypes from 'prop-types';

// Presentationals:
import NeedSigninWarning from 'presentationals/objects/NeedSigninWarning';
import UserCollaborations from 'presentationals/components/profile-page/UserCollaborations';

// Helpers:
import IfAuthHOC from 'lib/IfAuthHOC';
import RequestStatusHOC from 'lib/RequestsStatusHOC';


class OwnDecks extends React.Component {
  componentWillMount() {
    if (this.props.authState.isAuthenticated) {
      this.props.startOwnCollaborationsRequests(this.props.authState.id);
    }
  }

  render() {
    const { requestsStatus, errorMessage } = this.props.ownCollaborationsState;

    return (
      <IfAuthHOC
        isAuthenticated={this.props.authState.isAuthenticated}
        fallback={() =>
          <NeedSigninWarning requestedAction="display your decks" />}
      >
        <RequestStatusHOC
          requestsStatus={requestsStatus}
          pending={() => <p> Loading collaborations</p>}
          notStarted={() => <p> Loading collaborations</p>}
          failed={() => <p> Error: {errorMessage}</p>}
        >
          <UserCollaborations
            authState={this.props.authState}
            entities={this.props.entities}
            userId={this.props.authState.id}
          />
        </RequestStatusHOC>
      </IfAuthHOC>
    );
  }
}

OwnDecks.propTypes = {
  startOwnCollaborationsRequests: PropTypes.func.isRequired,
  ownCollaborationsState: PropTypes.shape({
    requestsStatus: PropTypes.oneOf(['notStarted', 'pending', 'succeeded', 'failed']),
    errorMessage: PropTypes.string,
  }).isRequired,
  requestDeckDeletion: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
// eslint-disable-next-line react/forbid-prop-types
  entities: PropTypes.object.isRequired,
};

export default OwnDecks;
