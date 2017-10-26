import parseSlideNodes from '../slide/parseSlideNodes';

function parseDeckNodes(
  ancestorNode,
  assetLinks,
  decksById = {},
  slidesById = {},
  contentItemsById = {},
  passedDeckId = null, // #TODO get rid of this parameter; get deck ID from HTML instead
) {
  const copiedDecksById = { ...decksById };
  let copiedSlidesById = { ...slidesById };
  let copiedContentItemsById = { ...contentItemsById };

  const deckIds = [];
  let slideIds;
  let newSlidesById;
  let newContentItemsById;
  let deck;
  let deckId;
  let slideSequence;

  let deckNodes = ancestorNode.getElementsByClassName('ows_deck'); // New save format

  if (deckNodes.length === 0) { // Old save format
    deckNodes = ancestorNode.getElementsByTagName('BODY');
  }

  if (passedDeckId !== null && deckNodes.length > 1) {
    console.error('Multiple deck elements per file not supported if deckId is explicitly passed.');
    deckNodes.splice(1); // Drop all deckNodes except the first, which could still be parsed.
  }

  [...deckNodes].forEach((deckNode) => {
    if (passedDeckId !== null) {
      deckId = passedDeckId;
    }
    else if (deckNode.dataset.id !== undefined) {
      deckId = deckNode.dataset.id;
    }
    else {
      console.error('Autogenerating deck ids not yet supported.'); // #TODO
    }

    ({
      slideIds,
      entities: { slidesById: newSlidesById, contentItemsById: newContentItemsById },
      options: { slideSequence },
    } = parseSlideNodes(
      deckNode,
      assetLinks,
      copiedSlidesById,
      copiedContentItemsById,
      deckId,
      0,
    ));

    deck = {
      id: deckId,
      slideIds,
      slideSequence,
    };

    deckIds.push(deckId);
    copiedDecksById[deckId] = deck;
    copiedSlidesById = {
      ...copiedSlidesById,
      ...newSlidesById,
    };
    copiedContentItemsById = {
      ...copiedContentItemsById,
      ...newContentItemsById,
    };
  });

  return {
    deckIds,
    entities: {
      decksById: copiedDecksById,
      slidesById: copiedSlidesById,
      contentItemsById: copiedContentItemsById,
    },
  };
}

export default parseDeckNodes;
