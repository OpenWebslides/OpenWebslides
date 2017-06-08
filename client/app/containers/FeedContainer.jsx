import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Immutable from 'seamless-immutable';
import { requestFeedNotifications, filterByType } from 'actions/feedActions';
import { FeedNotification } from 'presentationals/feed/FeedNotification';
import FeedToolbar from 'presentationals/feed/FeedToolbar';
import { feedNotificationTypes } from '../constants/feedConstants';

function renderFeedNotification(el) {
  return (
    <FeedNotification
      key={el.timestamp}
      timestamp={el.timestamp}
      concernedUser={el.concernedUser}
      targetDeck={el.targetDeck}
      type={el.type}
    />
  );
}

class Feed extends React.Component {
  componentWillMount() {
    this.props.requestFeedNotifications();
  }

  render() {
    const listOfFeedNotifications = this.props.feedState
      .listOfFeedNotifications;
    const selectedType = this.props.feedState.typeFilter;

    let notificationsToDisplay;

    const filteredFeedNotifications = Immutable.asMutable(
      listOfFeedNotifications,
    )
      .concat()
      .filter(e => e.type === selectedType || selectedType === 'ALL');

    if (
      filteredFeedNotifications.length === 0 &&
      this.props.feedState.errorMessage === ''
    ) {
      notificationsToDisplay = <li key="0"> No notifications to display </li>;
    } else if (
      filteredFeedNotifications.length === 0 &&
      this.props.feedState.errorMessage !== ''
    ) {
      notificationsToDisplay = (
        <li key="0"> There was an error retrieving notifications! </li>
      );
    } else {
      const numOfNotificationsToDisplay = filteredFeedNotifications.length <=
        this.props.feedState.currentOffset
        ? filteredFeedNotifications.length
        : this.props.feedState.currentOffset;

      const sortedNotificationsToDisplay = filteredFeedNotifications
        .concat()
        .sort((e1, e2) => e1.timestamp - e2.timeStamp);

      notificationsToDisplay = sortedNotificationsToDisplay
        .slice(0, numOfNotificationsToDisplay)
        .map(el => renderFeedNotification(el));
    }
    let lastNotification;

    if (
      filteredFeedNotifications.length === 0 &&
      this.props.feedState.sentRequestForList
    ) {
      lastNotification = <p> loading... </p>;
    } else {
      lastNotification = (
        <button
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { requestFeedNotifications, filterByType },
    dispatch,
  );
}

function mapStateToProps(state) {
  const feedState = state.app.feed;
  return {
    feedState,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
