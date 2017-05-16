import React from 'react';
import PropTypes from 'prop-types';
import { intervalFromNow } from '../../../lib/dateDisplay';
import { feedElementTypes } from '../../constants/feedConstants';

export function FeedElement({ timestamp, type, targetDeck, concernedUser }) {
  const className = 'c_feed-element';
  const inlineType = {
    DECK_CREATED: 'created a new deck:',
    DECK_UPDATED: 'updated the deck:',
  };
  const date = new Date(timestamp * 1000);

  const displayDate = intervalFromNow(date);

  return (
    <li key={timestamp} className={className}>
      <div>
        <h3>{feedElementTypes[type]}: </h3>
        <p>
          {' '}
          {concernedUser}
          {' '}
          has
          {' '}
          {inlineType[type]}
          {' '}
          <br />
          {' '}
          {'"'}
          {targetDeck}
          {'"'}
          {' '}
        </p>
        <p> - {displayDate} </p>
      </div>
    </li>
  );
}

FeedElement.propTypes = {
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(feedElementTypes)).isRequired,
  targetDeck: PropTypes.string.isRequired,
  concernedUser: PropTypes.string.isRequired,
};

export default FeedElement;
