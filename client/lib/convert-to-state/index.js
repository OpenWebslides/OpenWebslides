import _ from 'lodash';

import parseSlides from './parseSlides';

function convertToState(html) {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  if (_.isUndefined(document)) {
    throw new Error('Invalid data');
  }

  const slideArr = Array.from(document.body.children).filter(
    node => node.nodeName === 'SECTION',
  );

  return parseSlides(slideArr);
}

export default convertToState;
