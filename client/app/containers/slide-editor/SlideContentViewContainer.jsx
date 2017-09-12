import { connect } from 'react-redux';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';

import SlideContentView
  from 'presentationals/components/slide-editor/SlideContentView';

function mapStateToProps(state) {
  return {
    slide: getSlideById(state, getActiveSlideId(state)),
  };
}

export default connect(mapStateToProps)(SlideContentView);
