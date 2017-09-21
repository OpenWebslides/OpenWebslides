import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';



class UserProfile extends React.Component {
  componentWillMount() {
    this.props.fetchUser(this.props.id);
    this.props.fetchUserCollaborations(this.props.id);
    this.props.fetchUserDecksIds(this.props.id);
  }



  render() {
    const id = this.props.id;
    if (!this.props.entities.users || !this.props.entities.users.byId[id]) {
      return <p> Loading ...</p>;
    }

    const user = this.props.entities.users.byId[id];
    return (<h1>{user.firstName} {user.lastName}</h1>);
  }
}


UserProfile.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  fetchUserCollaborations: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default UserProfile;
