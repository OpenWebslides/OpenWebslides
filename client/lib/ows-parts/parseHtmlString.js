import parseDeckNodes from 'lib/ows-parts/deck/parseDeckNodes';

function parseHtmlString(
  HTMLString,
  assetLinks,
  deckId,
) {
  const parser = new DOMParser();
  const document = parser.parseFromString(HTMLString, 'text/html');
  const rootNode = document.documentElement;

  if (rootNode === undefined) {
    console.error('Invalid HTML file.');
    return { slidesById: {}, contentItemsById: {} };
  }
  else {
    const {
      deckIds,
      entities: { decksById, slidesById, contentItemsById },
    } = parseDeckNodes(rootNode, assetLinks, {}, {}, {}, deckId);

    // #TODO decksById
    return { slidesById, contentItemsById };
  }
}

export default parseHtmlString;
