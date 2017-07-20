/* eslint-disable no-case-declarations */
import React from 'react';
import { contentItemTypes } from 'constants/contentItemTypes';
import ipt from 'constants/inlinePropertyTypes';

// converters:

import illustrativeImageToReact from './convert-items/illustrativeImageToReact';
import decorativeImageToReact from './convert-items/decorativeImageToReact';
import iframeToReact from './convert-items/iframeToReact';
import titleToReact from './convert-items/titleToReact';

const { TITLE, PARAGRAPH, SECTION, LIST, LIST_ITEM, DECORATIVE_IMAGE, ILLUSTRATIVE_IMAGE, IFRAME } = contentItemTypes;
const { EM, STRONG } = ipt;

function contentItemObjectToReact(state, contentItemObject, currentLevel, sectionLevels) {
  const prefs = state.app.printView.prefs;
  switch (contentItemObject.contentItemType) {
    case TITLE:
      return titleToReact(contentItemObject, currentLevel, sectionLevels);
    case PARAGRAPH:
      return React.createElement('p', null, contentItemObject.text);
    case SECTION:
      const res = contentItemObject.childItemIds.map(itemId => {
        const itemObject = state.entities.contentItems.byId[itemId];
        return contentItemObjectToReact(state, itemObject, currentLevel + 1);
      });
      return res;
    case LIST:
      const childrenObjects = contentItemObject.childItemIds.map(itemId => state.entities.contentItems.byId[itemId]);
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        null,
        childrenObjects.map(child => contentItemObjectToReact(state, child, currentLevel)),
      );
    case LIST_ITEM:
      return React.createElement('li', null, contentItemObject.text);
    case ILLUSTRATIVE_IMAGE:
      return illustrativeImageToReact(contentItemObject, prefs.image);
    case DECORATIVE_IMAGE:
      return decorativeImageToReact(contentItemObject, prefs.image);
    case IFRAME:
      return iframeToReact(contentItemObject, prefs.iframe);
    default:
      return React.createElement('p', null, `Unsupported element: ${contentItemObject.contentItemType}`);
  }
}

function slideObjectToReact(state, slideObject) {
  const childrenObjects = slideObject.contentItemIds.map(itemId => state.entities.contentItems.byId[itemId]);
  const res = childrenObjects.reduce((arr, currentObject) => {
    const lvl = isNaN(slideObject.level) ? 1 : parseInt(slideObject.level, 10);
    const res = arr.concat(contentItemObjectToReact(state, currentObject, lvl));
    return res;
  }, []);
  return React.createElement(
    'div',
    { className: 'c_print-view__slide', 'data-level': isNaN(slideObject.level) ? 1 : parseInt(slideObject.level, 10) },
    res,
  );
}

function convertToPrint(state, deckId) {
  const slideIds = state.entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => state.entities.slides.byId[id]);
  const res = slideObjects.reduce(
    (arr, currentSlideObject) => arr.concat(slideObjectToReact(state, currentSlideObject)),
    [],
  );
  return res;
}

export default convertToPrint;
