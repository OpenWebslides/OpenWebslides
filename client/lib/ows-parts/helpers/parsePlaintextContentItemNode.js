import parseGeneralContentItemNode from './parseGeneralContentItemNode';
import parseNodeAttributeContent from './parseNodeAttributeContent';
import parseNodeInlineProperties from './parseNodeInlineProperties';

export default function parsePlaintextContentItemNode(
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
  } = parseGeneralContentItemNode(
    node,
    assetLinks,
    copiedContentItem,
    copiedContentItemsById,
    slideId,
    copiedContentItemSequence,
  ));

  copiedContentItem.text = parseNodeAttributeContent(node, 'textContent');
  copiedContentItem.inlineProperties = parseNodeInlineProperties(node);

  return {
    contentItem: copiedContentItem,
    contentItemIds: newContentItemIds,
    entities: { contentItemsById: copiedContentItemsById },
    options: { contentItemSequence: copiedContentItemSequence },
  };
}
