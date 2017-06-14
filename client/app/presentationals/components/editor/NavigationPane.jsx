import React from 'react';
import PropTypes from 'prop-types';

import Slide from './Slide';

function NavigationPane(props) {
  return (
    <div
      className={`c_deck-navigator c_deck-navigator--${props.cssIdentifier}`}
    >
      <div className="c_deck-navigator__wrapper">
        <ol className="o_list c_deck-navigator__list">
          {[1, 2, 3].map(id => (
            <li className="o_list__item c_deck-navigator__item" key={id}>
              <div className="o_list__item__wrapper c_deck-navigator__item__wrapper">
                <button className="c_deck-navigator__button">
                  <Slide>
                    <h1>Dummy slide content</h1>
                  </Slide>
                </button>
              </div>
            </li>
          ))}
        </ol>
        <p className="c_deck-navigator__controls">
          <button className="c_deck-navigator__add-button o_action o_action--add">
            Add slide
          </button>
        </p>
      </div>
    </div>
  );
}

NavigationPane.propTypes = {
  cssIdentifier: PropTypes.string,
};

NavigationPane.defaultProps = {
  cssIdentifier: 'default',
};

export default NavigationPane;
