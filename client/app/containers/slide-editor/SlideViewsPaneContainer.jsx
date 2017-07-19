import { connect } from 'react-redux';

import { getActiveSlideViewTypes } from 'selectors/app/editor';

import SlideViewsPane from 'presentationals/components/slide-editor/SlideViewsPane';

function mapStateToProps(state) {
  return {
    activeSlideViewTypes: getActiveSlideViewTypes(state),
  };
}

export default connect(mapStateToProps)(SlideViewsPane);