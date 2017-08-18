import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeAnnotationMode } from 'actions/app/annotations';

import AnnotationSidePanel from 'presentationals/components/annotations/AnnotationSidePanel';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeAnnotationMode }, dispatch);
}

export default connect(null, mapDispatchToProps)(AnnotationSidePanel);
