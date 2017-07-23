import { connect } from 'react-redux';

import { getActiveSlideId } from 'selectors/app/slide-editor';

import SlideLiveView from 'presentationals/components/slide-editor/SlideLiveView';

function mapStateToProps(state) {
  return {
    activeSlideId: getActiveSlideId(state),
  };
}

export default connect(mapStateToProps)(SlideLiveView);
