import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeck } from 'actions/entities/decks';

import PresentationView from 'presentationals/components/presentation-view/PresentationView';

function mapStateToProps(state) {
  return ({
    activeDeckId: state.app.presentationView.activeDeckId,
    activeSlideId: state.app.presentationView.activeSlideId,
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationView);
