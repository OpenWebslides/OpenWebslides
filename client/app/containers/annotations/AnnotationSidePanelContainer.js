import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { closeAnnotationMode, setActiveConversationId } from 'actions/app/annotations';

import AnnotationSidePanel from 'presentationals/components/annotations/AnnotationSidePanel';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeAnnotationMode, setActiveConversationId }, dispatch);
}

export default connect(null, mapDispatchToProps)(AnnotationSidePanel);
