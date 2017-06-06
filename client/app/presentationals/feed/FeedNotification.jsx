import React from 'react';
import PropTypes from 'prop-types';
import intervalFromNow from '../../../lib/dateDisplay';
import {
  feedNotificationTypes,
  inlineFeedNotificationType,
} from '../../constants/feedConstants';

export function FeedNotification({
  timestamp,
  type,
  targetDeck,
  concernedUser,
}) {
  const className = 'c_feed-notification';

  const date = new Date(timestamp * 1000);
  const displayDate = intervalFromNow(date);
  const contentsStringBegin = `${concernedUser} has ${inlineFeedNotificationType[
    type
  ]}`;
  const contentsStringEnd = `"${targetDeck}"`;

  return (
    <li key={timestamp} className={className}>
      <div>
        <h3>{feedNotificationTypes[type]}: </h3>
        <p>
          {contentsStringBegin} <br /> {contentsStringEnd}
        </p>
        <p> - {displayDate} </p>
      </div>
    </li>
  );
}

FeedNotification.propTypes = {
  timestamp: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(feedNotificationTypes)).isRequired,
  targetDeck: PropTypes.string.isRequired,
  concernedUser: PropTypes.string.isRequired,
};

export default FeedNotification;
