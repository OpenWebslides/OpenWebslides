import _ from 'lodash';
import { connect } from 'react-redux';

import { contentItemTypes, contentItemTypesById } from 'constants/contentItemTypes';

import { getActiveSlideId } from 'selectors/app/slide-editor';
import { getSlideById } from 'selectors/entities/slides';

import { addContentItemToSlide } from 'actions/entities/slides';

import Toolbar from 'presentationals/components/shared/Toolbar';

const toolbarContentItemTypes = [
  {
    id: contentItemTypes.TITLE,
    key: contentItemTypes.TITLE,
    props: {},
  },
  {
    id: contentItemTypes.PARAGRAPH,
    key: contentItemTypes.PARAGRAPH,
    props: {},
  },
  {
    id: contentItemTypes.LIST,
    key: `UNORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: false,
    },
  },
  {
    id: contentItemTypes.LIST,
    key: `ORDERED_${contentItemTypes.LIST}`,
    props: {
      ordered: true,
    },
  },
  {
    id: contentItemTypes.ILLUSTRATIVE_IMAGE,
    key: contentItemTypes.ILLUSTRATIVE_IMAGE,
    props: {},
  },
  {
    id: contentItemTypes.IFRAME,
    key: contentItemTypes.IFRAME,
    props: {},
  },
];

function mapStateToProps(state) {
  const activeSlideId = getActiveSlideId(state);
  const activeSlide = getSlideById(state, activeSlideId);
  const buttons = toolbarContentItemTypes.map(typeData => {
    const contentItemType = contentItemTypesById[typeData.id];
    return {
      id: contentItemType.id,
      key: typeData.key,
      text: contentItemType.name,
      actionCode: `add-${typeData.key.toLowerCase().replace('_', '-')}`,
      parameters: {
        slide: activeSlide,
        contentItemType: contentItemType.id,
        contentItemTypeProps: typeData.props,
      },
    };
  });

  return {
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
