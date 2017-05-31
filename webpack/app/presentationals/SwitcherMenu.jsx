import React from 'react';

function SwitcherMenu() {
  return (
    <div className="c_switcher-menu">
      <menu className="o_list c_switcher-menu__list">
        <li className="o_list__item c_switcher-menu__item">
          <button className="c_switcher-menu__button">
            Slide view
          </button>
        </li>
        <li className="o_list__item c_switcher-menu__item is_active">
          <button className="c_switcher-menu__button">
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

export default SwitcherMenu;
