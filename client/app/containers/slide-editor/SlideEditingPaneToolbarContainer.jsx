import { connect } from 'react-redux';

import { toolbarContentItemTypes, contentItemTypesById } from 'constants/contentItemTypes';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';

import { addContentItemToSlide } from 'actions/entities/slides';

import Toolbar from 'presentationals/components/shared/Toolbar';

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);
  const activeSlide = getSlideById(state, activeSlideId);
  const buttons = toolbarContentItemTypes.map(typeData => {
    const contentItemType = contentItemTypesById[typeData.id];
    return {
      id: contentItemType.id,
      key: typeData.key,
      text: contentItemType.name,
      parameters: {
        slide: activeSlide,
        contentItemType: contentItemType.id,
        contentItemTypeProps: typeData.props,
      },
    };
  });

  return {
    cssIdentifier: 'slide-editor',
    buttons,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onButtonClick: (button) => {
      dispatch(addContentItemToSlide(
        button.parameters.slide.id,
        button.parameters.contentItemType,
        button.parameters.contentItemTypeProps,
      ));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
