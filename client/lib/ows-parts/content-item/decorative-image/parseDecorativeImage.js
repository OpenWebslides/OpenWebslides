import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parseNodeAttributeContent from '../../helpers/parseNodeAttributeContent';
import parseGeneralContentItemNode from '../../helpers/parseGeneralContentItemNode';

function isDecorativeImage(node) {
  if (node.nodeName === 'IMG' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_decorative-image') &&
    node.getElementsByClassName('ows_decorative-image__image').length === 1
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseDecorativeImage(
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

  if (!isDecorativeImage(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.DECORATIVE_IMAGE;

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

    const imageNode = (node.className === 'ows_decorative-image')
      ? node.getElementsByClassName('ows_decorative-image__image')[0] // Assume image wrapper
      : node; // Assume raw image

    copiedContentItem.src = parseNodeAttributeContent(imageNode, 'src');
    copiedContentItem.alt = parseNodeAttributeContent(imageNode, 'alt');

    const dataId = imageNode.dataset.id;
    if (dataId !== undefined) {
      if (assetLinks[dataId] === undefined) {
        console.error('Undefined asset-link.');
      }
      else {
        copiedContentItem.src = assetLinks[dataId].src;
        copiedContentItem.filename = assetLinks[dataId].fileName;
        copiedContentItem.dataId = node.dataset.id;
      }
    }

    return {
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parseDecorativeImage;
