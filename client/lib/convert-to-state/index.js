import parseSlideNodes from './parseSlideNodes';

export default function convertToState(deckId, HTMLString) {
  const validSlideNodeNames = ['SECTION', 'DIV', 'ASIDE', 'ARTICLE'];
  const parser = new DOMParser();
  const document = parser.parseFromString(HTMLString, 'text/html');

  let slideNodes = [];

  if (document.body) {
    slideNodes = Array.from(document.body.children).filter(
      node => Array.indexOf(validSlideNodeNames, node.nodeName) !== -1 && node.className.includes('slide'),
    );
  }

  return parseSlideNodes(deckId, slideNodes);
}
