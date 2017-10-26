import _ from 'lodash';
import { contentItemTypes } from 'constants/contentItemTypes';
import parseNodeAttributeContent from '../../helpers/parseNodeAttributeContent';
import parseGeneralContentItemNode from '../../helpers/parseGeneralContentItemNode';

function isIframe(node) {
  if (node.nodeName === 'IFRAME' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_iframe') &&
    node.getElementsByClassName('ows_iframe__widget').length === 1
  ) {
    return true;
  }
  else {
    return false;
  }
}

function parseIframe(
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

  if (!isIframe(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    copiedContentItem.contentItemType = contentItemTypes.IFRAME;

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

    const iframeNode = (node.className === 'ows_iframe')
      ? node.getElementsByClassName('ows_iframe__widget')[0] // Assume iframe wrapper
      : node; // Assume raw iframe

    copiedContentItem.src = parseNodeAttributeContent(iframeNode, 'src');
    copiedContentItem.alt = parseNodeAttributeContent(iframeNode, 'title');

    return {
      contentItem: copiedContentItem,
      contentItemIds: newContentItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parseIframe;
