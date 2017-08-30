import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  viewFirstSlide,
  viewPreviousSlide,
  viewNextSlide,
  viewLastSlide,
} from 'actions/app/presentation-view';

import { toggleAnnotationMode } from 'actions/app/annotations';

import PresentationViewToolbar from 'presentationals/components/presentation-view/PresentationViewToolbar';

function mapStateToProps(state) {
  return ({ annotationMode: state.app.annotations.annotationMode });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    viewFirstSlide,
    viewPreviousSlide,
    viewNextSlide,
    viewLastSlide,
    toggleAnnotationMode,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PresentationViewToolbar);
