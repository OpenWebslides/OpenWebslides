import parseContainerContentItemNode from './parseContainerContentItemNode';

export default function parseSectioningContentItemNode(
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

  return {
    contentItem: copiedContentItem,
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}
