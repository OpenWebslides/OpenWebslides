import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSlide, setActiveSlide, deleteSlideWithContent } from 'actions/entities/slides';
import { getDeckById } from 'selectors/entities/decks';
import { getActiveDeckId, getActiveSlideId } from 'selectors/app/slide-editor';

import DeckNavigationPane from 'presentationals/components/slide-editor/DeckNavigationPane';

function mapStateToProps(state) {
  const activeDeckId = getActiveDeckId(state);
  const activeSlideId = getActiveSlideId(state);
  const activeDeck = getDeckById(state, activeDeckId);

  return {
    activeDeck: activeDeck,
    activeSlideId: activeSlideId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSlide, deleteSlideWithContent, setActiveSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckNavigationPane);
