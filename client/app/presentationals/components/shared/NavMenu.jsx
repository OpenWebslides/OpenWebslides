import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signout } from 'actions/signoutActions';


function NavMenu(props) {
  const { isAuthenticated, firstName, id } = props;

  function signoutUser() {
    props.signout();
  }

  function renderAuthLinks() {
    if (isAuthenticated) {
      return (
        <ul className="c_nav-menu__list">
          <li className="c_nav-menu__item" key={'Dashboard'}><Link className="c_nav-menu__link" to={'/'}>Dashboard </Link></li>
          <li className="c_nav-menu__item" key={'Editor'}><Link className="c_nav-menu__link" to={`/user/${id}`}>Profile </Link></li>
          <li className="c_nav-menu__item" key={'welcomeMessage'}>{`Welcome, ${firstName}`}</li>
          <li className="c_nav-menu__item" key={'Sign Out'}><a href="https://login.ugent.be/logout" onClick={() => signoutUser()}>Sign Out</a></li>
        </ul>
      );
    }

    return (
      <ul className="c_nav-menu__list">
        <li className="c_nav-menu__item" key={'Dashboard'}><Link className="c_nav-menu__link" to={'/'}>Dashboard </Link></li>
        <li className="c_nav-menu__item" key={'Editor'}><Link className="c_nav-menu__link" to={'/editor'}>Slide Editor </Link></li>
        <li className="c_nav-menu__item" key={'Sign in with UGent CAS'}><a href="/auth/cas">Sign in with UGent CAS</a></li>
      </ul>
    );
  }

  return (
    <div className={`c_nav-menu c_nav-menu--${props.cssIdentifier}`}>
      <div className="c_nav-menu__wrapper">
        {renderAuthLinks()}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return {
      isAuthenticated: state.app.authentication.isAuthenticated,
      firstName: state.app.authentication.firstName,
      id: state.app.authentication.id,
    };
  },
  (dispatch) => {
    return bindActionCreators({ signout }, dispatch);
  },
)(NavMenu);

NavMenu.propTypes = {
  cssIdentifier: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  id: PropTypes.string.isRequired,
};

NavMenu.defaultProps = {
  cssIdentifier: 'default',
  firstName: null,
};
