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

function contentItemObjectToReact(
  entities,
  contentItemObject,
  currentLevel,
  imagesPref,
  decorativeImagesPref,
  iframesPref,
) {
  switch (contentItemObject.contentItemType) {
    case TITLE:
      return titleToReact(contentItemObject, currentLevel);
    case PARAGRAPH:
      return React.createElement(
        'p',
        { 'data-level': currentLevel, className: 'c_print-view__paragraph' },
        contentItemObject.text,
      );
    case SECTION:
      return contentItemObject.childItemIds.map(itemId => {
        const itemObject = entities.contentItems.byId[itemId];
        return contentItemObjectToReact(
          entities,
          itemObject,
          currentLevel + 1,
          imagesPref,
          decorativeImagesPref,
          iframesPref,
        );
      });
    case LIST:
      const childrenObjects = contentItemObject.childItemIds.map(itemId => entities.contentItems.byId[itemId]);
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        { 'data-level': currentLevel, className: 'c_print-view__list' },
        childrenObjects.map(child =>
          contentItemObjectToReact(entities, child, currentLevel, imagesPref, decorativeImagesPref, iframesPref),
        ),
      );
    case LIST_ITEM:
      return React.createElement(
        'li',
        { 'data-level': currentLevel, className: 'c_print-view__list-item' },
        contentItemObject.text,
      );
    case ILLUSTRATIVE_IMAGE:
      return illustrativeImageToReact(contentItemObject, imagesPref, currentLevel);
    case DECORATIVE_IMAGE:
      return decorativeImageToReact(contentItemObject, decorativeImagesPref, currentLevel);
    case IFRAME:
      return iframeToReact(contentItemObject, iframesPref, currentLevel);
    default:
      return React.createElement('p', null, `Unsupported element: ${contentItemObject.contentItemType}`);
  }
}

function convertToPrint(entities, deckId, imagesPref, decorativeImagesPref, iframesPref) {
  const slideIds = entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => entities.slides.byId[id]);

  let elements = [];
  for (let i = 0; i < slideObjects.length; i += 1) {
    const slide = slideObjects[i];
    const level = parseInt(slide.level, 10);

    const slideElements = slide.contentItemIds.map(itemId => entities.contentItems.byId[itemId]);

    const reactElements = slideElements.reduce(
      (arr, currentObject) =>
        arr.concat(
          contentItemObjectToReact(entities, currentObject, level, imagesPref, decorativeImagesPref, iframesPref),
        ),
      [],
    );
    elements = elements.concat(reactElements);
  }
  return elements;
}

export default convertToPrint;
