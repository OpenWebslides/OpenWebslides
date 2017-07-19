import { connect } from 'react-redux';

import { getActiveSlideId, getActiveSlideViewTypes } from 'selectors/app/editor';

import SlideLiveView from 'presentationals/components/slide-editor/SlideLiveView';

function mapStateToProps(state) {
  return {
    activeSlideId: getActiveSlideId(state),
    activeSlideViewTypes: getActiveSlideViewTypes(state),
  };
}

export default connect(mapStateToProps)(SlideLiveView);
