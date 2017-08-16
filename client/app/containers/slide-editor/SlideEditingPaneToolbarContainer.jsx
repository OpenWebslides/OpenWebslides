import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toolbarContentItemTypes,
} from 'constants/contentItemTypes';

import { getActiveSlideId, getActiveSlideViewTypes } from 'selectors/app/slide-editor';

import { addContentItemToSlide } from 'actions/entities/slides';

import Toolbar from 'presentationals/components/shared/Toolbar';

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);

  return {
    cssIdentifier: 'slide-editor',
    activeSlideId,
    buttonTypes: toolbarContentItemTypes,
    activeViewTypes: getActiveSlideViewTypes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addContentItemToSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
