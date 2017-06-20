import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestFeedNotifications, filterByType } from 'actions/feedActions';

import FeedView from 'presentationals/components/feed/FeedView';

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

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
