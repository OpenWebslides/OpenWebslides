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

function contentItemObjectToReact(state, contentItemObject, currentLevel) {
  const prefs = state.app.printView.prefs;
  switch (contentItemObject.contentItemType) {
    case TITLE:
      return titleToReact(contentItemObject, currentLevel);
    case PARAGRAPH:
      return React.createElement('p', { 'data-level': currentLevel }, contentItemObject.text);
    case SECTION:
      return contentItemObject.childItemIds.map(itemId => {
        const itemObject = state.entities.contentItems.byId[itemId];
        return contentItemObjectToReact(state, itemObject, currentLevel + 1);
      });
    case LIST:
      const childrenObjects = contentItemObject.childItemIds.map(itemId => state.entities.contentItems.byId[itemId]);
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        { 'data-level': currentLevel },
        childrenObjects.map(child => contentItemObjectToReact(state, child, currentLevel)),
      );
    case LIST_ITEM:
      return React.createElement('li', { 'data-level': currentLevel }, contentItemObject.text);
    case ILLUSTRATIVE_IMAGE:
      return illustrativeImageToReact(contentItemObject, prefs.image, currentLevel);
    case DECORATIVE_IMAGE:
      return decorativeImageToReact(contentItemObject, prefs.image, currentLevel);
    case IFRAME:
      return iframeToReact(contentItemObject, prefs.iframe, currentLevel);
    default:
      return React.createElement('p', null, `Unsupported element: ${contentItemObject.contentItemType}`);
  }
}

function slideObjectToReact(state, slideObject) {
  const childrenObjects = slideObject.contentItemIds.map(itemId => state.entities.contentItems.byId[itemId]);
  // Reduce the list of childrens to an array of react elements
  const res = childrenObjects.reduce((arr, currentObject) => {
    const lvl = isNaN(slideObject.level) ? 0 : parseInt(slideObject.level, 10);
    return arr.concat(contentItemObjectToReact(state, currentObject, lvl));
  }, []);
  // return React.createElement(
  //   'div',
  //   { className: 'c_print-view__slide', 'data-level': isNaN(slideObject.level) ? 0 : parseInt(slideObject.level, 10) },
  //   res,
  // );
}

function convertToPrint(state, deckId) {
  const slideIds = state.entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => state.entities.slides.byId[id]);

  let elements = [];

  for (let i = 0; i < slideObjects.length; i += 1) {
    const slide = slideObjects[i];
    const level = parseInt(slide.level, 10);

    const slideElements = slide.contentItemIds.map(itemId => state.entities.contentItems.byId[itemId]);

    const reactElements = slideElements.reduce(
      (arr, currentObject) => arr.concat(contentItemObjectToReact(state, currentObject, level)),
      [],
    );
    elements = elements.concat(reactElements);
  }
  return elements;
}

export default convertToPrint;
