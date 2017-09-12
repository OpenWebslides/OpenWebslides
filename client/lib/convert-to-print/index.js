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
  amountOfImages,
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
          currentLevel,
          imagesPref,
          decorativeImagesPref,
          iframesPref,
          amountOfImages
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
      return illustrativeImageToReact(contentItemObject, imagesPref, amountOfImages, currentLevel);
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

function countImagesInSlide(slideElements, entities) {
  debugger;
  let elementsToCount = [];
  if (slideElements[0].contentItemType === 'SECTION') {
    const childItems = slideElements[0].childItemIds.map(
      itemId => entities.contentItems.byId[itemId],
    );
    elementsToCount = elementsToCount.concat(childItems);
  }
  else {
    elementsToCount = slideElements;
  }

  let counter = 0;
  elementsToCount.forEach((e) => {
    if (e.contentItemType === 'ILLUSTRATIVE_IMAGE') {
      counter += 1;
    }
  });
debugger;
  return counter;
}

function convertSlideToContentItems(slide, entities, imagesPref, decorativeImagesPref, iframesPref) {
  const slideElements = slide.contentItemIds.map(itemId => entities.contentItems.byId[itemId]);
  const level = parseInt(slide.level, 10);
  const amountOfImages = countImagesInSlide(slideElements, entities);
  return slideElements.reduce(
    (arr, currentObject) =>
      arr.concat(
        contentItemObjectToReact(
          entities, currentObject, level, imagesPref, decorativeImagesPref, iframesPref, amountOfImages,
        ),
      ),
    [],
  );
}


function divideTopLevelIntoSections(slides, level) {
  const sections = [];
  let currentSection = [];
  let i = 0;

  while (i < slides.length) {
    // Add the first slide which we assume to be at level 1
    currentSection.push(slides[i]);
    i += 1;
    while (i < slides.length && slides[i].level > level) {
      currentSection.push(slides[i]);
      i += 1;
    }
    sections.push(currentSection);
    currentSection = [];
  }

  return sections;
}

// Returns a <section> element containing all nested sections
function convertSection(slides, currentLevel, entities, imagesPref, decorativeImagesPref, iframesPref) {
  let thisSectionElements;

  thisSectionElements = convertSlideToContentItems(
    slides[0], entities, imagesPref, decorativeImagesPref, iframesPref,
  );


  if (slides.length > 1) {
    const subSections = divideTopLevelIntoSections(slides.slice(1), currentLevel + 1);
    const subSectionsElements = subSections.map(
      section => convertSection(
        section, currentLevel + 1, entities, imagesPref, decorativeImagesPref, iframesPref,
      ),
    );
    thisSectionElements = thisSectionElements.concat(subSectionsElements);
  }
  // debugger;

  return React.createElement(
    'section',
    null,
    thisSectionElements,
  );
}


function convertToPrint(entities, deckId, imagesPref, decorativeImagesPref, iframesPref) {
  const slideIds = entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => entities.slides.byId[id]).asMutable();
  const sections = divideTopLevelIntoSections(slideObjects, 1);
  const elements = sections.map(
    section => convertSection(
      section, 1, entities, imagesPref, decorativeImagesPref, iframesPref,
    ),
  );
  return elements;
}
export default convertToPrint;
