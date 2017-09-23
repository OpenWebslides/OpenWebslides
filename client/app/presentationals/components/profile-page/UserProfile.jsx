import React from 'react';
import PropTypes from 'prop-types';



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
      return (<h1>{user.firstName} {user.lastName}</h1>);
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
};

export default UserProfile;
