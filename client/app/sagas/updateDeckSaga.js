import { takeLatest, call, select } from 'redux-saga/effects';
import updateDeckApi from 'api/updateDeckApi';

import { UPDATE_DECK } from 'actions/entities/decks';

import { getActiveDeckId } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import { contentItemTypes } from 'constants/contentItemTypes';
import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

function* convertContentItems(contentItemIds, headingLevel) {
  let string = '';

  for (let i = 0; i < contentItemIds.length; i += 1) {
    const contentItemObject = yield select(getContentItemById, contentItemIds[i]);

    switch (contentItemObject.contentItemType) {
      case contentItemTypes.TITLE: {
        const heading = `h${headingLevel}`;

        const text = getHTMLStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<${heading}>${text}</${heading}>`;
        break;
      }
      case contentItemTypes.PARAGRAPH: {
        const text = getHTMLStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<p>${text}</p>`;
        break;
      }
      case contentItemTypes.SECTION: {
        const childContent = yield convertContentItems(contentItemObject.childItemIds, headingLevel + 1);

        string += `<section>${childContent}</section>`;
        break;
      }
      case contentItemTypes.ASIDE: {
        const childContent = yield convertContentItems(contentItemObject.childItemIds, headingLevel + 1);

        string += `<aside>${childContent}</aside>`;
        break;
      }
      case contentItemTypes.LIST: {
        const listType = contentItemObject.ordered ? 'ol' : 'ul';
        const listItems = yield convertContentItems(contentItemObject.childItemIds, headingLevel);

        string += `<${listType}>${listItems}</${listType}>`;
        break;
      }
      case contentItemTypes.LIST_ITEM: {
        const text = getHTMLStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<li>${text}</li>`;
        break;
      }
      case contentItemTypes.IFRAME: {
        const { src, alt } = contentItemObject;

        string += `<iframe src="${src}" alt="${alt}"/>`;
        break;
      }
      case contentItemTypes.ILLUSTRATIVE_IMAGE: {
        const { src, alt, caption } = contentItemObject;

        string += `<figure><img src="${src}" alt="${alt}"/><figcaption><a href="${src}">${caption}</a></figcaption></figure>`;
        break;
      }
      case contentItemTypes.DECORATIVE_IMAGE: {
        const { src, alt } = contentItemObject;

        string += `<img src="${src}" alt="${alt}"/>`;
        break;
      }
      default:
        break;
    }
  }
  return string;
}

function* convertSlide(slideId) {
  const slideObject = yield select(getSlideById, slideId);
  const contentItemsString = yield convertContentItems(slideObject.contentItemIds, 1);

  const slideString = `<div class="slide" data-level="${slideObject.level}">${contentItemsString}</div>`;

  return slideString;
}

function* convertToHTML(deckObject) {
  const slideStringArray = yield deckObject.slideIds.map(slideId => call(convertSlide, slideId));
  const deckString = slideStringArray.join('');

  return `
    <header class="caption">
    <h1>Presentation</h1>
    <p><a href="">Author</a></p>
    </header>
    ${deckString}
    <div class="progress"></div>
  `;
}

function* doUpdateDeck() {
  try {
    const activeDeckId = yield select(getActiveDeckId);
    const deck = yield select(getDeckById, activeDeckId);
    const htmlString = yield convertToHTML(deck);

    yield call(updateDeckApi, deck.id, htmlString);
  } catch (e) {
    console.log(e);
  }
}

function* updateDeckWatcher() {
  yield takeLatest(UPDATE_DECK, doUpdateDeck);
}

export default updateDeckWatcher;
