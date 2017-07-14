/* eslint-disable no-case-declarations */
import React from 'react';

import cit from 'constants/contentItemTypes';
import ipt from 'constants/itemPropertyTypes';

const { TITLE, PARAGRAPH, SECTION, LIST, LIST_ITEM, IMAGE } = cit;
const { EM, STRONG } = ipt;

const levelToTitle = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

function contentItemObjectToReact(state, contentItemObject, currentLevel) {
  switch (contentItemObject.contentItemType) {
    case TITLE:
      return React.createElement(
        levelToTitle[currentLevel],
        null,
        contentItemObject.text,
      );
    case PARAGRAPH:
      return React.createElement('p', null, contentItemObject.text);
    case SECTION:
      const res = contentItemObject.childItemIds.map(itemId => {
        const itemObject = state.entities.contentItems.byId[itemId];
        return contentItemObjectToReact(state, itemObject, currentLevel + 1);
      });
      return res;
    case LIST:
      const childrenObjects = contentItemObject.childItemIds.map(
        itemId => state.entities.contentItems.byId[itemId],
      );
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        null,
        childrenObjects.map(child =>
          contentItemObjectToReact(state, child, currentLevel),
        ),
      );
    case LIST_ITEM:
      return React.createElement('li', null, contentItemObject.text);
    case IMAGE:
      return React.createElement(
        'img',
        { src: contentItemObject.src, alt: contentItemObject.alt },
        null,
      );
    default:
      return React.createElement(
        'p',
        null,
        `Unsupported element: ${contentItemObject.contentItemType}`,
      );
  }
}

function slideObjectToReact(state, slideObject) {
  const childrenObjects = slideObject.contentItemIds.map(
    itemId => state.entities.contentItems.byId[itemId],
  );
  const res = childrenObjects.reduce((arr, currentObject) => {
    const lvl = isNaN(slideObject.level) ? 1 : parseInt(slideObject.level, 10);
    const res = arr.concat(contentItemObjectToReact(state, currentObject, lvl));
    return res;
  }, []);
  return res;
}

function convertToPrint(state, deckId) {
  const slideIds = state.entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => state.entities.slides.byId[id]);
  const res = slideObjects.reduce(
    (arr, currentSlideObject) =>
      arr.concat(slideObjectToReact(state, currentSlideObject)),
    [],
  );
  return res;
}

export default convertToPrint;
