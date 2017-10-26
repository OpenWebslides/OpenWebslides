import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parseContainerContentItemNode from '../../helpers/parseContainerContentItemNode';

function isList(node) {
  if (_.includes(['UL', 'OL'], node.nodeName) && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_list')
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseList(
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

  if (!isList(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.LIST;

    ({
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    } = parseContainerContentItemNode(
      node,
      assetLinks,
      copiedContentItem,
      copiedContentItemsById,
      slideId,
      copiedContentItemSequence,
    ));

    copiedContentItem.ordered = (node.nodeName === 'OL' || node.dataset.ordered === 'true');

    return {
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parseList;
