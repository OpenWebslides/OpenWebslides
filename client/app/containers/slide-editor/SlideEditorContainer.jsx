import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeck } from 'actions/entities/decks';

import SlideEditor from 'presentationals/components/slide-editor/SlideEditor';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideEditor);
