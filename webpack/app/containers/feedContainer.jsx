import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Immutable from 'seamless-immutable';
import requestEvents from 'actions/feedActions';
import { FeedElement, feedElementTypes } from '../components/feed/feedElement';

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
        viewed={el.viewed}
        type={el.type}
      />
      );
    }

    // console.log('Rendering feed');
    // console.log('Feed State: ', this.props);
    const listOfFeedElements = this.props.feedState.listOfFeedElements;
    let elementsToDisplay;

    if (this.props.feedState.receivedList === false) {
      elementsToDisplay = <li key="0"> No elements to display</li>;
    } else {
      const numOfElementsToDisplay = listOfFeedElements.length <= 10 ?
        listOfFeedElements.length : 10;

      const sortedElementsToDisplay = Immutable.asMutable(listOfFeedElements).concat().sort(
        (e1, e2) => e1.timestamp - e2.timeStamp);

      elementsToDisplay =
        sortedElementsToDisplay
          .slice(0, numOfElementsToDisplay)
          .map(el => renderElement(el));
      // .map(el => <li>Working</li>)
    }

    return (
      <div className="socialFeedContainer">
        <h1> Social feed </h1>
        <ol>
          {elementsToDisplay}
        </ol>
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
    viewed: PropTypes.bool.isRequired,
  })),
  feedState: PropTypes.shape({
    listOfFeedElements: PropTypes.array.isRequired,
    sentRequestForList: PropTypes.bool.isRequired,
    receivedList: PropTypes.bool.isRequired,
  }).isRequired,

};

Feed.defaultProps = {
  listOfFeedElements: [],
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestEvents }, dispatch);
}

function mapStateToProps(state) {
  // console.log('mapping state: ', state.local.feed);
  const feedState = state.local.feed;
  return {
    feedState,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);

