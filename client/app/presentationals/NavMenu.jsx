import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

function NavMenu(props) {
  const menuItems = {
    '/': 'Dashboard',
    '/editor/slide': 'Slide editor',
    '/signup': 'Sign up',
    '/signin': 'Sign in',
  };

  return (
    <header className={`c_nav-menu c_nav-menu--${props.cssIdentifier}`}>
      <div className="c_nav-menu__wrapper">
        <ul className="c_nav-menu__list">
          {Object.keys(menuItems).map(route =>
            <li className="c_nav-menu__item" key={route}>
              <Link className="c_nav-menu__link" to={route}>
                {menuItems[route]}
              </Link>
            </li>,
          )}
        </ul>
      </div>
    </header>
  );
}

NavMenu.propTypes = {
  cssIdentifier: PropTypes.string,
};

NavMenu.defaultProps = {
  cssIdentifier: 'default',
};

export default NavMenu;
