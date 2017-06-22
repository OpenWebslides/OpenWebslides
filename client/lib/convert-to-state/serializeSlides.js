import { convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js';

function parseSlides(slideArr) {
  let slideId = 0;
  let contentGroupId = 0;
  let contentBlockId = 0;

  const slides = {};
  const contentBlocks = {};

  slideArr.forEach(slide => {
    slides[slideId] = { meta: {}, content: [] };

    slides[slideId].content = (function parseContentBlocks(nodes) {
      const content = [];

      nodes.forEach(node => {
        if (node.outerHTML === undefined) {
          return;
        }

        if (node.nodeName === 'SECTION') {
          const childContent = parseContentBlocks(node.childNodes);

          content.push({
            type: 'contentGroup',
            id: contentGroupId,
            childContent,
          });
          contentGroupId += 1;
        } else {
          content.push({
            id: contentBlockId,
            type: 'contentBlock',
          });

          contentBlocks[contentBlockId] = {
            data: EditorState.createWithContent(
              convertFromHTML(node.outerHTML),
            ),
          };

          contentBlockId += 1;
        }
      });
      return content;
    })(slide.childNodes);

    slideId += 1;
  });

  return { slides, contentBlocks };
}

export default parseSlides;
