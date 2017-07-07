// @flow
import parseContent from './parseContent';

export default function convertToState(HTMLString: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(HTMLString, 'text/html');

  let slideNodes = [];

  if (document.body) {
    slideNodes = Array.from(document.body.children).filter(
      node => node.nodeName === 'SECTION' && node.className.includes('slide'),
    );
  }

  return parseContent(slideNodes);
}
