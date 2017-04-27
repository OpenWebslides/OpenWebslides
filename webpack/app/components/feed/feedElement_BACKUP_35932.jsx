<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { feedElementTypes } from '../../constants/feedConstants';

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
        <p> {concernedUser} has {inlineType[type]} <br /> &#34;{targetDeck}&#34; </p>
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

export default FeedElement;
||||||| merged common ancestors
=======
import React from 'react';
import PropTypes from 'prop-types';
import { feedElementTypes } from '../../constants/feedConstants';

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
        <p> {concernedUser} has {inlineType[type]} &#34;{targetDeck}&#34; </p>
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

export default FeedElement;
>>>>>>> 8adb5abd82e01288e44dae374129f6347ebe8f90
