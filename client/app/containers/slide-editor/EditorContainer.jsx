import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchSlides } from 'actions/slideActions';

import Editor from 'presentationals/components/editor/Editor';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides }, dispatch);
}

export default connect(null, mapDispatchToProps)(Editor);
