import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toolbarContentItemTypes,
} from 'constants/contentItemTypes';

import { getActiveSlideId, getActiveSlideViewTypes } from 'selectors/app/slide-editor';

import { addContentItemToSlide } from 'actions/entities/slides';
import { updateDeck } from 'actions/entities/decks';

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
  return bindActionCreators({ addContentItemToSlide, updateDeck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
