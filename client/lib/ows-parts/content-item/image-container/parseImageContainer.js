function parseImageContainer(
  node,
  assetLinks,
  contentItem,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  const copiedContentItemsById = { ...contentItemsById };

  return {
    contentItem: null,
    contentItemIds: null,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence },
  };
}

export default parseImageContainer;
