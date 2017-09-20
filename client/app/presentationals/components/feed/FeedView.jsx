import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

// Components:
import { FeedNotification } from 'presentationals/components/feed/FeedNotification';
import FeedToolbar from 'presentationals/components/feed/FeedToolbar';

// Constants:
import { feedNotificationTypes } from '../../../constants/feedConstants';

function renderFeedNotification(el) {
  return (
    <FeedNotification
      key={el.id}
      timestamp={el.timestamp}
      concernedUser={el.concernedUser}
      concernedUserId={el.concernedUserId}
      targetDeck={el.targetDeck}
      targetDeckId={el.targetDeckId}
      type={el.type}
    />
  );
}

function filterNotificationsByType(listOfNotifications, type) {
  return Immutable.asMutable(listOfNotifications)
    .concat() // Return a new array instead of mutating
    .filter(e => e.type === type || type === 'ALL');
}

class Feed extends React.Component {
  componentWillMount() {
    this.props.requestFeedNotifications();
  }

  checkWhatToDisplay(filteredList) {
    if (this.props.feedState.errorMessage === '' && filteredList.length === 0) {
      return <li key="0"> No notifications to display </li>;
    }
    else if (
      filteredList.length === 0 &&
      this.props.feedState.errorMessage !== ''
    ) {
      return <li key="0"> There was an error retrieving notifications! </li>;
    }
    const numOfNotificationsToDisplay =
      filteredList.length <= this.props.feedState.currentOffset
        ? filteredList.length
        : this.props.feedState.currentOffset;
    const sortedNotificationsToDisplay = filteredList
      .concat()
      .sort((e1, e2) => e1.timestamp - e2.timeStamp);

    return sortedNotificationsToDisplay
      .slice(0, numOfNotificationsToDisplay)
      .map(el => renderFeedNotification(el));
  }

  computeLastNotification(filteredList) {
    if (filteredList.length === 0 && this.props.feedState.sentRequestForList) {
      return <p> loading... </p>;
    }
    return (
      <button
        className="c_feed-notifications-container__more-button"
        onClick={() => {
          this.props.requestFeedNotifications(
            this.props.feedState.currentOffset,
          );
        }}
      >
        more
      </button>
    );
  }

  render() {
    const listOfFeedNotifications = this.props.feedState
      .listOfFeedNotifications;
    const selectedType = this.props.feedState.typeFilter;

    const filteredFeedNotifications = filterNotificationsByType(
      listOfFeedNotifications,
      selectedType,
    );
    const notificationsToDisplay = this.checkWhatToDisplay(
      filteredFeedNotifications,
    );
    const lastNotification = this.computeLastNotification(
      filteredFeedNotifications,
    );

    return (
      <div className="c_feed-container">
        <h1> Social feed</h1>
        <FeedToolbar
          selectedType={selectedType}
          typeChange={this.props.filterByType}
        />
        <div className="c_feed-notifications-container">
          <ol>
            {notificationsToDisplay}
            <li key={Number.MAX_SAFE_INTEGER}>
              {lastNotification}
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  requestFeedNotifications: PropTypes.func.isRequired,
  listOfFeedNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timeStamp: PropTypes.number.isRequired,
      type: PropTypes.oneOf(Object.keys(feedNotificationTypes)).isRequired,
      targetDeck: PropTypes.string.isRequired,
      concernedUser: PropTypes.string.isRequired,
    }),
  ),
  feedState: PropTypes.shape({
    listOfFeedNotifications: PropTypes.array.isRequired,
    sentRequestForList: PropTypes.bool.isRequired,
    receivedList: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    currentOffset: PropTypes.number.isRequired,
    typeFilter: PropTypes.oneOf(Object.keys(feedNotificationTypes)).isRequired,
  }).isRequired,
  filterByType: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  listOfFeedNotifications: [],
};

export default Feed;
