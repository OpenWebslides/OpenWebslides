import React from 'react';
import PropTypes from 'prop-types';

import SlideContainer from './SlideContainer';

function DeckNavigator(props) {
  return (
    <div
      className={`c_deck-navigator c_deck-navigator--${props.cssIdentifier}`}
    >
      <div className="c_deck-navigator__wrapper">
        <ol className="o_list c_deck-navigator__list">
          {[1, 2, 3].map(() =>
            <li className="o_list__item c_deck-navigator__item">
              <button className="c_deck-navigator__button">
                <SlideContainer />
              </button>
            </li>,
          )}
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

DeckNavigator.propTypes = {
  cssIdentifier: PropTypes.string.isRequired,
};

DeckNavigator.defaultProps = {
  cssIdentifier: 'default',
};

export default DeckNavigator;
