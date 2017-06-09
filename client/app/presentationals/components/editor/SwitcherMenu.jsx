import React from 'react';
import PropTypes from 'prop-types';

function SwitcherMenu(props) {
  return (
    <div className={`c_switcher-menu c_switcher-menu--${props.cssIdentifier}`}>
      <menu className="o_list c_switcher-menu__list">
        <li className="o_list__item c_switcher-menu__item">
          <button className="c_switcher-menu__button">
            Slide view
          </button>
        </li>
        <li className="o_list__item c_switcher-menu__item is_active">
          <button className="c_switcher-menu__button" disabled>
            Content view
          </button>
        </li>
        <li className="o_list__item c_switcher-menu__item">
          <button className="c_switcher-menu__button" disabled>
            Print view
          </button>
        </li>
        <li className="o_list__item c_switcher-menu__item">
          <button className="c_switcher-menu__button" disabled>
            Document view
          </button>
        </li>
      </menu>
    </div>
  );
}

SwitcherMenu.propTypes = {
  cssIdentifier: PropTypes.string,
};

SwitcherMenu.defaultProps = {
  cssIdentifier: 'default',
};

export default SwitcherMenu;
