import React from 'react';
import PropTypes from 'prop-types';
import { feedElementTypes } from '../../constants/feedConstants';

function dateToTimeIdentifier(date) {
  const interval = Date.now() - date;

  const min = 60;
  const hr = min * 60;
  const day = hr * 24;
  const week = day * 7;
  const month = week * 4;
  if (interval < min) {
    return 'less than a minute ago';
  } else if (interval < hr) {
    const minutes = Math.floor(interval / min);
    return `${minutes} ${minutes === 1 ? 'minute' : minutes} ago`;
  } else if (interval < day) {
    const hours = Math.floor(interval / hr);
    return `${hours} ${hours === 1 ? 'hour' : hours} ago`;
  } else if (interval < week) {
    const days = Math.floor(interval / day);
    return `${days} ${days === 1 ? 'day' : days} ago`;
  } else if (interval < month) {
    const weeks = Math.floor(interval / week);
    return `${weeks} ${weeks === 1 ? 'week' : weeks} ago`;
  }
  const months = Math.floor(interval / month);
  return `${months} ${months === 1 ? 'month' : months} ago`;
}


export function FeedElement({ timestamp, type, targetDeck, concernedUser }) {
  const className = 'c_feed-element';
  const inlineType = {
    DECK_CREATED: 'created a new deck:',
    DECK_UPDATED: 'updated the deck:',
  };
  const date = new Date(timestamp * 1000);

  const displayDate = dateToTimeIdentifier(date);

  return (
    <li
      key={timestamp}
      className={className}
    >
      <div>
        <h3>{feedElementTypes[type]}: </h3>
        <p> {concernedUser} has {inlineType[type]} <br /> &#34;{targetDeck}&#34; </p>
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
