import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { contentItemTypes } from 'constants/contentItemTypes';

import {
  addContentItemToSlide,
  deleteContentItemFromSlide,
} from 'actions/entities/slides';

import {
  getActiveContentItemId,
  getFocusedSlideViewType,
} from 'selectors/app/slide-editor';

import { getContentItemById } from 'selectors/entities/content-items';

import generateAttributesObject from 'lib/content-item/helpers/generateAttributes';
import ContentViewItem from './ContentViewItem';


function mapStateToProps(state, props) {
  const contentItem = getContentItemById(state, props.contentItemId);
  const focusedSlideViewType = getFocusedSlideViewType(state);
  const activeContentItemId = getActiveContentItemId(state);

  const isFocused =
    contentItem.id === activeContentItemId &&
    props.slideViewType === focusedSlideViewType;
  const attributes = generateAttributesObject(contentItem);

  return {
    contentItem,
    attributes,
    isFocused,
  };
}

const ContentItemContainer = connect(mapStateToProps)(ContentViewItem);

ContentItemContainer.propTypes = {
  slideViewType: PropTypes.string.isRequired,
  contentItemId: PropTypes.string.isRequired,
  ancestorItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  slideId: PropTypes.string.isRequired,
};

export default ContentItemContainer;
