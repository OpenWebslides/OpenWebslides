import { slideViewTypes } from 'constants/slideViewTypes';
import { generateContentItemId } from './generateIds';

export default function parseGeneralContentItemNode(
  node,
  assetLinks,
  contentItem,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  const copiedContentItem = { ...contentItem };
  const copiedContentItemsById = { ...contentItemsById };
  let copiedContentItemSequence = contentItemSequence;

  // #TODO get id from HTML or autogenerate
  copiedContentItem.id = generateContentItemId(slideId, copiedContentItemSequence);
  copiedContentItemSequence += 1;

  copiedContentItem.viewType = (node.dataset.viewType)
    ? node.dataset.viewType.toUpperCase()
    : slideViewTypes.LIVE;

  return {
    contentItem: copiedContentItem,
    contentItemIds: null,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}
