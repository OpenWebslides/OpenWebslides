import React from 'react';
import PropTypes from 'prop-types';

export const feedElementTypes = {
  DECK_CREATED: 'Deck created',
  DECK_UPDATED: 'Deck updated',
};

export function FeedElement({ timestamp, type, targetDeck, concernedUser, viewed }) {
  let className = 'c_feed-element';
  className += viewed ? ' is_viewed' : '';

  const inlineType = {
    DECK_CREATED: 'created a new deck:',
    DECK_UPDATED: 'updated the deck:',
  };
  return (
    <li
      key={timestamp}
      className={className}
    >
      <div>
        <h3>{feedElementTypes[type]}: </h3>
        <p> {concernedUser} has {inlineType[type]} {targetDeck}</p>
      </div>
    </li>
  );
}

FeedElement.propTypes = {
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(feedElementTypes)).isRequired,
  targetDeck: PropTypes.string.isRequired,
  concernedUser: PropTypes.string.isRequired,
  viewed: PropTypes.bool.isRequired,
};

