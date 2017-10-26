import parseGeneralContentItemNode from './parseGeneralContentItemNode';
import parseContentItemNodes from '../content-item/parseContentItemNodes';

export default function parseContainerContentItemNode(
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
  let childItemIds = null;

  ({
    contentItem: copiedContentItem,
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  } = parseGeneralContentItemNode(
    node,
    assetLinks,
    copiedContentItem,
    copiedContentItemsById,
    slideId,
    copiedContentItemSequence,
  ));

  ({
    contentItemIds: childItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  } = parseContentItemNodes(
    node,
    assetLinks,
    copiedContentItemsById,
    slideId,
    copiedContentItemSequence,
  ));

  copiedContentItem.childItemIds = childItemIds;

  return {
    contentItem: copiedContentItem,
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}
