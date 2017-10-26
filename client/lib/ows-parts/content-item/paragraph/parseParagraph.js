import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parsePlaintextContentItemNode from '../../helpers/parsePlaintextContentItemNode';

function isParagraph(node) {
  if (node.nodeName === 'P' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_paragraph')
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseParagraph(
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

  if (!isParagraph(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.PARAGRAPH;

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

export default parseParagraph;
