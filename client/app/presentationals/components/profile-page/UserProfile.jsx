import React from 'react';
import PropTypes from 'prop-types';

import UserDecks from 'presentationals/components/profile-page/UserDecks';
import UserCollaborations from 'presentationals/components/profile-page/UserCollaborations';


class UserProfile extends React.Component {
  componentWillMount() {
    this.props.profilePageStartRequests(this.props.id);
  }

  render() {
    const id = this.props.id;
    if (this.props.profilePageState.requestsRunning) {
      return <p> Loading ...</p>;
    }
    else if (this.props.profilePageState.requestsSucceeded) {
      const user = this.props.entities.users.byId[id];
      return (<div className="c_user-profile--container">
        <h1> {user.firstName} {user.lastName} </h1>
        <div className="c_user-profile--decks-container">
          <UserDecks
            entities={this.props.entities}
            ids={user.decks}
            authState={this.props.authState}
          />
          <UserCollaborations
            entities={this.props.entities}
            ids={user.collaborations}
            authState={this.props.authState}
          />
        </div>
      </div>
      );
    }
    else {
      return <p> Error: {this.props.profilePageState.userInfoError}</p>;
    }
  }
}


UserProfile.propTypes = {
  profilePageState: PropTypes.shape({
    userInfoError: PropTypes.string,
    requestsSucceeded: PropTypes.bool,
    requestsRunning: PropTypes.bool,
  }).isRequired,
  profilePageStartRequests: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  authState: PropTypes.shape({
    id: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserProfile;
