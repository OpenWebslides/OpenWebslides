import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { slideViewTypesById } from 'constants/slideViewTypes';

function SlideViewsMenu(props) {
  let buttonId;
  let buttonActive;

  return (
    <div className={`c_switcher-menu c_switcher-menu--${props.cssIdentifier}`}>
      <menu className="o_list c_switcher-menu__list">
        {_.values(slideViewTypesById).map(slideViewType => {

          buttonId = slideViewType.id.toLowerCase().replace('_', '-');
          buttonActive = Array.indexOf(props.activeSlideViewTypes, slideViewType.id) !== -1;

          return (
            <li
              className={`o_list__item c_switcher-menu__item`}
              key={slideViewType.id}
            >
              <button
                className={`c_switcher-menu__button c_switcher-menu__button--id_${buttonId} ${buttonActive && 'is_active'}`}
                onClick={ () => props.onButtonClick(slideViewType.id) }
              >
                <span className="c_switcher-menu__button__wrapper">
                  {slideViewType.name}
                </span>
              </button>
            </li>
          )
        })}
      </menu>
    </div>
  );
}

SlideViewsMenu.propTypes = {
  cssIdentifier: PropTypes.string,
  activeSlideViewTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

SlideViewsMenu.defaultProps = {
  cssIdentifier: 'default',
};

export default SlideViewsMenu;
