import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parsePlaintextContentItemNode from '../../helpers/parsePlaintextContentItemNode';

function isTitle(node) {
  if (
    _.includes(['H1', 'H2', 'H3', 'H4', 'H5', 'H6'], node.nodeName) &&
    !node.className.startsWith('ows_')
  ) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_title')
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseTitle(
  node,
  assetLinks,
  contentItem,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  let copiedContentItem = { ...contentItem };
  let copiedContentItemsById = { ...contentItemsById };
  let copiedContentItemSequence = contentItemSequence;
  let newContentItemIds = null;

  if (!isTitle(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.TITLE;

    ({
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    } = parsePlaintextContentItemNode(
      node,
      assetLinks,
      copiedContentItem,
      copiedContentItemsById,
      slideId,
      copiedContentItemSequence,
    ));

    // Temporary property; will be deleted after the second pass. #TODO see if this can be removed
    copiedContentItem.headingLevel = node.nodeName.slice(-1);

    return {
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parseTitle;
