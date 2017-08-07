import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  toolbarContentItemTypes,
  contentItemTypesById,
} from 'constants/contentItemTypes';

import { getActiveSlideId, getActiveSlideViewTypes } from 'selectors/app/slide-editor';

import { addContentItemToSlide } from 'actions/entities/slides';

import Toolbar from 'presentationals/components/shared/Toolbar';

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);
  const buttons = toolbarContentItemTypes.map((typeData) => {
    const contentItemType = contentItemTypesById[typeData.id];
    return {
      id: contentItemType.id,
      key: typeData.key,
      text: contentItemType.name,
      parameters: {
        contentItemType: contentItemType.id,
        contentItemTypeProps: typeData.props,
      },
    };
  });

  return {
    cssIdentifier: 'slide-editor',
    buttons,
    activeSlideId,
    activeViewTypes: getActiveSlideViewTypes(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addContentItemToSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
