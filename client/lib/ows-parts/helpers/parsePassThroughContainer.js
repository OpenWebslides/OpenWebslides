import _ from 'lodash';
import parseContentItemNodes from '../content-item/parseContentItemNodes';

function isPassThroughContainer(node) {
  if (node.nodeName === 'DIV' && !node.className.startsWith('ows_')) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_pass-through')
  ) {
    return true;
  }
  else if (
    _.includes(node.className.split(' '), 'ows_image-container') ||
    _.includes(node.className.split(' '), 'ows_image-container__wrapper')
  ) {
    // #TODO temporary fix for allowing image-container to pass-through without error message;
    // delete this after image-containers have been refactored out of the saved HTML
    return true;
  }
  else {
    return false;
  }
}

function parsePassThroughContainer(
  node,
  assetLinks,
  contentItem,
  contentItemsById,
  slideId,
  contentItemSequence,
) {
  let copiedContentItemsById = { ...contentItemsById };
  let copiedContentItemSequence = contentItemSequence;


  if (!isPassThroughContainer(node)) {
    return {
      contentItem: null,
      contentItemIds: null,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
  else {
    let childItemIds = [];

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

    return {
      contentItem: null,
      contentItemIds: childItemIds,
      entities: { contentItemsById: copiedContentItemsById },
      options: { contentItemSequence: copiedContentItemSequence },
    };
  }
}

export default parsePassThroughContainer;
