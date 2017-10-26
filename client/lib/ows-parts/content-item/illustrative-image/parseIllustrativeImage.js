import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parseNodeAttributeContent from '../../helpers/parseNodeAttributeContent';
import parseGeneralContentItemNode from '../../helpers/parseGeneralContentItemNode';

function isIllustrativeImage(node) {
  if (node.nodeName === 'FIGURE' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_illustrative-image') &&
    node.getElementsByClassName('ows_illustrative-image__image').length === 1 &&
    node.getElementsByTagName('FIGCAPTION').length === 1
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseIllustrativeImage(
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

  if (!isIllustrativeImage(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.ILLUSTRATIVE_IMAGE;

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

    let imageNode;
    let captionNode;

    if (node.className === 'ows_illustrative-image') { // Assume image wrapper
      imageNode = node.getElementsByClassName('ows_illustrative-image__image')[0];
      captionNode = node.getElementsByClassName('ows_illustrative-image__caption')[0];
    }
    else { // Assume raw image
      imageNode = node.getElementsByTagName('IMG')[0];
      captionNode = node.getElementsByTagName('FIGCAPTION')[0];
    }

    copiedContentItem.src = parseNodeAttributeContent(imageNode, 'src');
    copiedContentItem.alt = parseNodeAttributeContent(imageNode, 'alt');
    copiedContentItem.caption = parseNodeAttributeContent(captionNode, 'textContent');

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

export default parseIllustrativeImage;
