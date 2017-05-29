import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function FeedContainer(props) {
  const { isAuthenticated } = props;

  if (isAuthenticated) {
    const { firstName } = props;
    return (
      <div>
        <h1>Welcome, {firstName}!</h1>
      </div>
    );
  }
  return (
    <div>
      <h3>
        Welcome to OpenWebSlides! Please log in to unlock a world of wonder!
      </h3>
      <Link to="/signin">Sign in now!</Link>
    </div>
  );
}

FeedContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.local.auth.isAuthenticated,
    firstName: state.local.auth.firstName,
  };
}

export default connect(mapStateToProps)(FeedContainer);
