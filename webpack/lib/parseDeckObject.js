import React from 'react';
import ReactContentBlocks from './reactContentBlocks';

function parseDeckObject(deckObject) {
  const { slides } = deckObject;
  const slideArray = [];

  function convertContentBlocksToReactElements(contentBlockIds) {
    const ReactElementArr = [];
    const { contentBlocks } = deckObject;

    contentBlockIds.forEach(id => {
      const { type, attributes, childIds, value } = contentBlocks.byId[id];

      const props = Object.assign(
        {
          key: `contentBlock${id}`,
          contentBlockId: id,
        },
        attributes,
      );

      if (childIds) {
        const childElements = convertContentBlocksToReactElements(childIds);
        const element = React.createElement(
          ReactContentBlocks[type],
          props,
          childElements,
        );
        ReactElementArr.push(element);
      }

      if (value) {
        const element = React.createElement(
          ReactContentBlocks.TextNode,
          props,
          value,
        );
        ReactElementArr.push(element);
      }
    });
    return ReactElementArr;
  }

  slides.allIds.forEach(slideId => {
    const slideContent = [];
    const { contentBlocks } = slides.byId[slideId];

    slideContent.push(convertContentBlocksToReactElements(contentBlocks));

    const slideComponent = React.createElement(
      ReactContentBlocks.Slide,
      { key: `slide${slideId}` },
      slideContent,
    );
    slideArray.push(slideComponent);
  });
  return slideArray;
}

export default parseDeckObject;
