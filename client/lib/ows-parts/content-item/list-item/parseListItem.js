import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parsePlaintextContentItemNode from '../../helpers/parsePlaintextContentItemNode';

function isListItem(node) {
  if (node.nodeName === 'LI' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_list-item')
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseListItem(
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

  if (!isListItem(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.LIST_ITEM;

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

    return {
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parseListItem;
