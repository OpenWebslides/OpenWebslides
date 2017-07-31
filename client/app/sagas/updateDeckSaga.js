import { takeLatest, call, select } from 'redux-saga/effects';
import updateDeckApi from 'api/updateDeckApi';

import { UPDATE_DECK } from 'actions/entities/decks';

import { getActiveDeckId } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import { contentItemTypes } from 'constants/contentItemTypes';
import { generateAttributesObject } from 'lib/content-item/ContentItemContainer';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

export function* convertContentItems(contentItemIds, headingLevel) {
  let string = '';

  for (let i = 0; i < contentItemIds.length; i += 1) {
    string += '\n';

    const contentItemObject = yield select(getContentItemById, contentItemIds[i]);

    const attributes = yield call(generateAttributesObject, contentItemObject);

    const attributeString = yield Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');

    switch (contentItemObject.contentItemType) {
      case contentItemTypes.TITLE: {
        const heading = `h${headingLevel}`;

        const text = yield call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += yield `<${heading} ${attributeString}>${text}</${heading}>`;
        break;
      }
      case contentItemTypes.PARAGRAPH: {
        const text = yield call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += yield `<p ${attributeString}>${text}</p>`;
        break;
      }

      case contentItemTypes.SECTION: {
        const childContent = yield convertContentItems(contentItemObject.childItemIds, headingLevel + 1);

        string += `<section ${attributeString}>${childContent}</section>`;
        break;
      }
      case contentItemTypes.ASIDE: {
        const childContent = yield convertContentItems(contentItemObject.childItemIds, headingLevel + 1);

        string += `<aside ${attributeString}>${childContent}</aside>`;
        break;
      }
      case contentItemTypes.LIST: {
        const listType = contentItemObject.ordered ? 'ol' : 'ul';
        const listItems = yield convertContentItems(contentItemObject.childItemIds, headingLevel);

        string += `<${listType} ${attributeString}>${listItems}</${listType}>`;
        break;
      }
      case contentItemTypes.LIST_ITEM: {
        const text = getHTMLStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<li ${attributeString}>${text}</li>`;
        break;
      }
      case contentItemTypes.IFRAME: {
        const { src, alt } = contentItemObject;

        string += `<iframe ${attributeString} src="${src}" alt="${alt}"></iframe>`;
        break;
      }
      case contentItemTypes.ILLUSTRATIVE_IMAGE: {
        const { src, alt, caption } = contentItemObject;

        string += `<figure><img ${attributeString} src="${src}" alt="${alt}"/><figcaption><a href="${src}">${caption}</a></figcaption></figure>`;
        break;
      }
      case contentItemTypes.DECORATIVE_IMAGE: {
        const { src, alt } = contentItemObject;

        string += `<img ${attributeString} src="${src}" alt="${alt}"/>`;
        break;
      }
      default:
        break;
    }
  }
  return string;
}

export function* convertSlides(slideIds) {
  let slideString = '';

  for (let i = 0; i < slideIds.length; i += 1) {
    const slideObject = yield select(getSlideById, slideIds[i]);
    const contentItemsString = yield call(convertContentItems, slideObject.contentItemIds, 1);

    slideString += `<div class="slide" data-level="${slideObject.level}">${contentItemsString}</div>`;
  }

  return slideString;
}

export function* convertToHTML(deckObject) {
  const { slideIds } = deckObject;

  const slideStringArray = yield call(convertSlides, slideIds);
  const deckString = yield slideStringArray.join('');

  return `<header class="caption"><h1>Presentation</h1><p><a href="">Author</a></p></header>${deckString}<div class="progress"></div>`;
}

function* doUpdateDeck() {
  try {
    const activeDeckId = yield select(getActiveDeckId);
    const deck = yield select(getDeckById, activeDeckId);
    const htmlString = yield convertToHTML(deck);

    yield call(updateDeckApi, deck.id, htmlString);
  }
  catch (e) {
    console.log(e);
  }
}

function* updateDeckWatcher() {
  yield takeLatest(UPDATE_DECK, doUpdateDeck);
}

export default updateDeckWatcher;
