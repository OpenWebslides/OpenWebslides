import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setActiveSlideId } from 'actions/app/slide-editor';
import { addSlideToDeck, deleteSlideFromDeck } from 'actions/entities/decks';

import { getDeckById } from 'selectors/entities/decks';
import { getActiveDeckId, getActiveSlideId } from 'selectors/app/slide-editor';

import DeckNavigationPane
  from 'presentationals/components/slide-editor/DeckNavigationPane';

function mapStateToProps(state) {
  const activeDeckId = getActiveDeckId(state);
  const activeSlideId = getActiveSlideId(state);
  const activeDeck = getDeckById(state, activeDeckId);

  return {
    activeDeck,
    activeSlideId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addSlideToDeck,
    deleteSlideFromDeck,
    setActiveSlideId,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckNavigationPane);
