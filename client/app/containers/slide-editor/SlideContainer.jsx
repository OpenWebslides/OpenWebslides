import { connect } from 'react-redux';

import { getActiveSlideViewTypes } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';

import Slide from 'presentationals/components/slide-editor/slide';

function mapStateToProps(state, props) {
  return {
    slide: getSlideById(state, props.id),
    activeSlideViewTypes: getActiveSlideViewTypes(state),
  };
}

export default connect(mapStateToProps)(Slide);