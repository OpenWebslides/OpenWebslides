import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchDeck } from 'actions/deckActions';

import SlideEditor from 'presentationals/components/slide-editor/SlideEditor';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDeck }, dispatch);
}

export default connect(null, mapDispatchToProps)(SlideEditor);
