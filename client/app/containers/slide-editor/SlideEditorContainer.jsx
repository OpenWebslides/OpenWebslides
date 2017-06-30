import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSlides } from 'actions/slideActions';

import SlideEditor from 'presentationals/components/slide-editor/SlideEditor';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides }, dispatch);
}

export default connect(null, mapDispatchToProps)(SlideEditor);
