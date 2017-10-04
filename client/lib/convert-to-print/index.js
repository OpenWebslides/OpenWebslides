/* eslint-disable no-case-declarations */
import React from 'react';
import { contentItemTypes } from 'constants/contentItemTypes';
import ipt from 'constants/inlinePropertyTypes';

// converters:
import ConversationElement from 'presentationals/components/print-view/ConversationElement';
import illustrativeImageToReact from './convert-items/illustrativeImageToReact';
import decorativeImageToReact from './convert-items/decorativeImageToReact';
import iframeToReact from './convert-items/iframeToReact';
import titleToReact from './convert-items/titleToReact';

const { TITLE, PARAGRAPH, SECTION, LIST, LIST_ITEM, IMAGE_CONTAINER, ILLUSTRATIVE_IMAGE, DECORATIVE_IMAGE, IFRAME } = contentItemTypes;
const { EM, STRONG } = ipt;

function contentItemObjectToReact(
  entities,
  contentItemObject,
  currentLevel,
  preferences,
  amountOfImages = 0,
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
          entities, itemObject, currentLevel, preferences,
        );
      });
    case LIST:
      let childrenObjects = contentItemObject.childItemIds.map(
        itemId => entities.contentItems.byId[itemId],
      );
      return React.createElement(
        contentItemObject.ordered ? 'ol' : 'ul',
        { 'data-level': currentLevel, className: 'c_print-view__list' },
        childrenObjects.map(child =>
          contentItemObjectToReact(entities, child, currentLevel, preferences),
        ),
      );
    case LIST_ITEM:
      return React.createElement(
        'li',
        { 'data-level': currentLevel, className: 'c_print-view__list-item' },
        contentItemObject.text,
      );
    case IMAGE_CONTAINER:
      childrenObjects = contentItemObject.childItemIds.map(
        itemId => entities.contentItems.byId[itemId],
      );
      return React.createElement(
        'div',
        { className: 'c_print-view__image-container' },
        childrenObjects.map(child =>
          contentItemObjectToReact(entities, child, currentLevel, preferences, childrenObjects.length),
        ),
      );
    case ILLUSTRATIVE_IMAGE:
      return illustrativeImageToReact(
        contentItemObject, preferences.imagePref, amountOfImages, currentLevel,
      );
    case DECORATIVE_IMAGE:
      return decorativeImageToReact(
        contentItemObject, preferences.decorativeImagePref, currentLevel,
      );
    case IFRAME:
      return iframeToReact(contentItemObject, preferences.iframesPref, currentLevel);
    default:
      return React.createElement(
        'p',
        null,
        `Unsupported element: ${contentItemObject.contentItemType}`,
      );
  }
}

function getRelevantConversations(conversationsById, slideId) {
  let relevantConversations = [];
  Object.keys(conversationsById).forEach((id) => {
    if (conversationsById[id].contentItemId === slideId) {
      relevantConversations = relevantConversations.concat(conversationsById[id]);
    }
  });
  return relevantConversations;
}
function getRelevantComments(commentsById, conversationId) {
  let relevantComments = [];
  Object.keys(commentsById).forEach((id) => {
    if (commentsById[id].conversationId === conversationId) {
      relevantComments = relevantComments.concat(commentsById[id]);
    }
  });
  return relevantComments;
}

function convertSlideToContentItems(slide, entities, preferences) {
  const slideElements = slide.contentItemIds.map(itemId => entities.contentItems.byId[itemId]);
  const level = parseInt(slide.level, 10);
  const slideId = slide.id;

  const conversations = getRelevantConversations(entities.conversations.byId, slideId);
  const amountOfImages = countImagesInSlide(slideElements, entities);
  let reactElements = slideElements.reduce(
    (arr, currentObject) =>
      arr.concat(
        contentItemObjectToReact(entities, currentObject, level, preferences, amountOfImages),
      ),
    [],
  );

  if (conversations) {
    if (preferences.annotationsPref === 'INLINE') {
      reactElements = reactElements.concat(conversations.map((conversation) => {
        const comments = getRelevantComments(entities.conversationComments.byId, conversation.id);
        const conversationWithComments = { ...conversation, comments };
        return ConversationElement(conversationWithComments);
      }));
    }
  }
  return reactElements;
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
function convertSection(slides, currentLevel, entities, preferences) {
  let thisSectionElements;

  thisSectionElements = convertSlideToContentItems(slides[0], entities, preferences);


  if (slides.length > 1) {
    const subSections = divideTopLevelIntoSections(slides.slice(1), currentLevel + 1);
    const subSectionsElements = subSections.map(
      section => convertSection(
        section, currentLevel + 1, entities, preferences,
      ),
    );
    thisSectionElements = thisSectionElements.concat(subSectionsElements);
  }

  return React.createElement(
    'section',
    null,
    thisSectionElements,
  );
}


function convertToPrint(entities, deckId, preferences) {
  const slideIds = entities.decks.byId[deckId].slideIds;
  const slideObjects = slideIds.map(id => entities.slides.byId[id]).asMutable();
  const sections = divideTopLevelIntoSections(slideObjects, 0);
  const elements = sections.map(
    section => convertSection(section, 0, entities, preferences),
  );
  return elements;
}
export default convertToPrint;
