import Immutable from 'seamless-immutable';

import includesInlineStyle from './helpers';
import contentBlockTypes from '../contentBlockTypes';
import parseInline from './parseInline';

function parseSlides(slideArr) {
  let slideId = 1;
  let contentBlockId = 1;

  const slides = { byId: {} };
  const contentBlocks = { byId: {} };

  slideArr.forEach(slide => {
    slides.byId[slideId] = { id: slideId, contentBlockIds: [] };

    (function parseContentBlocks(nodes) {
      nodes.forEach(node => {
        const { textContent, nodeName, childNodes } = node;

        slides.byId[slideId].contentBlockIds.push(contentBlockId);

        contentBlocks.byId[contentBlockId] = {
          id: contentBlockId,
          data: textContent,
          type: contentBlockTypes[nodeName],
        };

        const childArr = Array.from(childNodes);

        if (childArr.some(includesInlineStyle)) {
          contentBlocks.byId[contentBlockId].inlineProperties = parseInline(
            childArr,
          );
        }

        contentBlockId += 1;
      });
    })(slide.childNodes);

    slideId += 1;
  });

  return Immutable({ slides, contentBlocks });
}

export default parseSlides;
