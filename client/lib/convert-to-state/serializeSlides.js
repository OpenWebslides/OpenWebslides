import { convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';

function parseSlides(slideArr) {
  let slideSequence = 0;
  let contentGroupSequence = 0;
  let contentBlockSequence = 0;

  const slides = {};
  const contentBlocks = {};

  if (slideArr.length === 0) {
    slides[slideSequence] = { meta: {}, content: [] };
    slideSequence += 1;
  }

  slideArr.forEach(slide => {
    slides[slideSequence] = { meta: {}, content: [] };

    slides[slideSequence].content = (function parseContentBlocks(nodes) {
      const content = [];

      nodes.forEach(node => {
        if (node.outerHTML === undefined) {
          return;
        }

        if (node.nodeName === 'SECTION') {
          const childContent = parseContentBlocks(node.childNodes);

          content.push({
            type: 'contentGroup',
            id: contentGroupSequence,
            childContent,
          });
          contentGroupSequence += 1;
        } else {
          content.push({
            id: contentBlockSequence,
            type: 'contentBlock',
          });

          contentBlocks[contentBlockSequence] = {
            data: EditorState.createWithContent(
              convertFromHTML(node.outerHTML),
            ),
          };

          contentBlockSequence += 1;
        }
      });
      return content;
    })(slide.childNodes);

    slideSequence += 1;
  });

  return {
    slides,
    contentBlocks,
    slideSequence,
    contentBlockSequence,
    contentGroupSequence,
  };
}

export default parseSlides;
