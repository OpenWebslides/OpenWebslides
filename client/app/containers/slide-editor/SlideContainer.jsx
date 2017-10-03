import _ from 'lodash';
import { connect } from 'react-redux';

import { getActiveDeckId, getActiveSlideViewTypes } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';
import { getSlideById } from 'selectors/entities/slides';

import Slide from 'presentationals/components/slide-editor/Slide';

function mapStateToProps(state, props) {
  // Calculate slide number.
  // #TODO calculating this for every slide container is very inefficient
  // ideally the deck.slideIds should be passed down from higher up
  const activeDeckId = getActiveDeckId(state);
  const activeDeck = getDeckById(state, activeDeckId);
  const numberOfSlidesInDeck = activeDeck.slideIds.length;
  const slideIndexInDeck = _.indexOf(activeDeck.slideIds, props.id);

  return {
    slide: getSlideById(state, props.id),
    activeSlideViewTypes: getActiveSlideViewTypes(state),
    numberOfSlidesInDeck,
    slideIndexInDeck,
  };
}

export default connect(mapStateToProps)(Slide);
