import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Immutable from 'seamless-immutable';
import { requestEvents, filterByType } from 'actions/feedActions';
import { FeedElement } from '../components/feed/feedElement';
import { feedElementTypes } from '../constants/feedConstants';
import FeedToolbar from '../components/feed/feedToolbar';

class Feed extends React.Component {
  componentWillMount() {
    this.props.requestEvents();
  }

  render() {
    function renderElement(el) {
      return (<FeedElement
        timestamp={el.timestamp}
        concernedUser={el.concernedUser}
        targetDeck={el.targetDeck}
        type={el.type}
      />
      );
    }

    const listOfFeedElements = this.props.feedState.listOfFeedElements;
    const selectedType = this.props.feedState.typeFilter;
    let elementsToDisplay;

    const filteredFeedElements =
            Immutable.asMutable(listOfFeedElements)
              .concat()
              .filter(e => e.type === selectedType || selectedType === 'ALL');
    if (this.props.feedState.receivedList === false || filteredFeedElements.length === 0) {
      elementsToDisplay = <li key="0"> No elements to display</li>;
    } else {
      const numOfElementsToDisplay = filteredFeedElements.length <= 10 ?
        filteredFeedElements.length : 10;

      const sortedElementsToDisplay = filteredFeedElements.concat().sort(
        (e1, e2) => e1.timestamp - e2.timeStamp);

      elementsToDisplay =
        sortedElementsToDisplay
          .slice(0, numOfElementsToDisplay)
          .map(el => renderElement(el));
    }

    return (
      <div className="c_feed-container">
        <h1> Social feed </h1>
        <FeedToolbar
          selectedType={selectedType}
          typeChange={this.props.filterByType}
        />
        <div className="c_feed-elements-container">
          <ol>
            {elementsToDisplay}
          </ol>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  requestEvents: PropTypes.func.isRequired,
  listOfFeedElements: PropTypes.arrayOf(PropTypes.shape({
    timeStamp: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.keys(feedElementTypes)).isRequired,
    targetDeck: PropTypes.string.isRequired,
    concernedUser: PropTypes.string.isRequired,
  })),
  feedState: PropTypes.shape({
    listOfFeedElements: PropTypes.array.isRequired,
    sentRequestForList: PropTypes.bool.isRequired,
    receivedList: PropTypes.bool.isRequired,
    typeFilter: PropTypes.oneOf(Object.keys(feedElementTypes)).isRequired,
  }).isRequired,
  filterByType: PropTypes.func.isRequired,

};

Feed.defaultProps = {
  listOfFeedElements: [],
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestEvents, filterByType }, dispatch);
}

function mapStateToProps(state) {
  const feedState = state.local.feed;
  return {
    feedState,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
