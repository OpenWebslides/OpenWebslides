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
      return contentItemObject.childItemIds.map((itemId) => {
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
      const childrenObjects = contentItemObject.childItemIds.map(
        itemId => entities.contentItems.byId[itemId],
      );
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        { 'data-level': currentLevel, className: 'c_print-view__list' },
        childrenObjects.map(child =>
          contentItemObjectToReact(
            entities, child, currentLevel, imagesPref, decorativeImagesPref, iframesPref,
          ),
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
      return React.createElement(
        'p',
        null,
        `Unsupported element: ${contentItemObject.contentItemType}`,
      );
  }
}


function convertSlideToContentItems(slide, entities, imagesPref, decorativeImagesPref, iframesPref) {
  const slideElements = slide.contentItemIds.map(itemId => entities.contentItems.byId[itemId]);
  const level = parseInt(slide.level, 10);

  return slideElements.reduce(
    (arr, currentObject) =>
      arr.concat(
        contentItemObjectToReact(
          entities, currentObject, level, imagesPref, decorativeImagesPref, iframesPref,
        ),
      ),
    [],
  );
}

// Returns a <section> element containing all nested sections
function convertSection(slides, currentLevel, entities, imagesPref, decorativeImagesPref, iframesPref) {
  let thisSectionElements = [];
  for (let i = 0; i < slides.length; i += 1) {
    if (slides[i].level === currentLevel) {
      if (!slides[i + 1] || slides[i + 1].level === currentLevel) {
        // there is no subsection, so add the content directly to the current section
        thisSectionElements = thisSectionElements.concat(
          convertSlideToContentItems(
            slides[i], entities, imagesPref, decorativeImagesPref, iframesPref,
          ),
        );
      }
      else {
        // Add the current slide to the section:
        thisSectionElements = thisSectionElements.concat(
          convertSlideToContentItems(
            slides[i], entities, imagesPref, decorativeImagesPref, iframesPref,
          ),
        );
        i += 1;
        let subsectionSlides = [];
        while (i < slides.length && slides[i].level > currentLevel) {
          subsectionSlides = subsectionSlides.concat(slides[i]);
          i += 1;
        }
        // Then convert the subsection:
        thisSectionElements = thisSectionElements.concat(
          convertSection(
            subsectionSlides,
            currentLevel + 1,
            entities,
            imagesPref,
            decorativeImagesPref,
            iframesPref,
          ),
        );
      }
    }
  }

  return React.createElement(
    'section',
    null,
    thisSectionElements,
  );
}
function convertToPrint(entities, deckId, imagesPref, decorativeImagesPref, iframesPref) {
  const slideIds = entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => entities.slides.byId[id]);

  const elements = convertSection(
    slideObjects, 1, entities, imagesPref, decorativeImagesPref, iframesPref,
  );

  return elements;
}
export default convertToPrint;
