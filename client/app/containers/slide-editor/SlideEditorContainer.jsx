import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeck } from 'actions/deckActions';

import SlideEditor from 'presentationals/components/slide-editor/SlideEditor';

function mapStateToProps(state) {
  return {
    activeDeckId: state.app.editor.activeDeckId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideEditor);
