import React from 'react';
import PropTypes from 'prop-types';

function DeckNavigator(props) {
  return (
    <div
      className={`c_deck-navigator c_deck-navigator--${props.cssIdentifier}`}
    >
      <div className="c_deck-navigator__wrapper">
        <p>[deck navigator goes here]</p>
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
