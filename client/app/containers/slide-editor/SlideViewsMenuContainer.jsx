import { connect } from 'react-redux';

import { toggleSlideView } from 'actions/app/slide-editor';

import { getActiveSlideViewTypes } from 'selectors/app/slide-editor';

import SlideViewsMenu
  from 'presentationals/components/slide-editor/SlideViewsMenu';

function mapStateToProps(state) {
  return {
    activeSlideViewTypes: getActiveSlideViewTypes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (slideViewType) => {
      dispatch(toggleSlideView(slideViewType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideViewsMenu);
