import { takeLatest, call, select, put } from 'redux-saga/effects';
import updateDeckApi from 'api/updateDeckApi';

import { UPDATE_DECK, updateDeckSuccess } from 'actions/entities/decks';
import { SIGNOUT } from 'actions/signoutActions';

import { getActiveDeckId } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import { contentItemTypes } from 'constants/contentItemTypes';
import generateAttributesObject from 'lib/content-item-container/helpers/generateAttributesObject';

import getHtmlStringFromInlinePropertiesAndText
  from 'lib/getHtmlStringFromInlinePropertiesAndText';

function* convertContentItems(contentItemIds, headingLevel, indent = '') {
  let string = '';

  for (let i = 0; i < contentItemIds.length; i += 1) {
    string += `\n${indent}`;

    const contentItemObject = yield select(getContentItemById, contentItemIds[i]);

    const attributes = generateAttributesObject(contentItemObject);
    const attributeString = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');

    switch (contentItemObject.contentItemType) {
      case contentItemTypes.TITLE: {
        const heading = `h${headingLevel <= 6 ? headingLevel : 6}`;
        const text = getHtmlStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<${heading} ${attributeString}>${text}</${heading}>`;
        break;
      }

      case contentItemTypes.PARAGRAPH: {
        const text = getHtmlStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<p ${attributeString}>${text}</p>`;
        break;
      }
      case contentItemTypes.SECTION: {
        const childContent = yield convertContentItems(
          contentItemObject.childItemIds,
          headingLevel + 1,
          `${indent}  `,
        );

        string += `<section ${attributeString}>${childContent}\n${indent}</section>`;
        break;
      }
      case contentItemTypes.ASIDE: {
        const childContent = yield convertContentItems(
          contentItemObject.childItemIds,
          headingLevel + 1,
          `${indent}  `,
        );

        string += `<aside ${attributeString}>${childContent}\n${indent}</aside>`;
        break;
      }
      case contentItemTypes.LIST: {
        const listType = contentItemObject.ordered ? 'ol' : 'ul';
        const listItems = yield convertContentItems(
          contentItemObject.childItemIds,
          headingLevel,
          `${indent}  `,
        );

        string += `<${listType} ${attributeString}>${listItems}\n${indent}</${listType}>`;
        break;
      }
      case contentItemTypes.LIST_ITEM: {
        const text = getHtmlStringFromInlinePropertiesAndText(
          contentItemObject.inlineProperties,
          contentItemObject.text,
        );

        string += `<li ${attributeString}>${text}</li>`;
        break;
      }
      case contentItemTypes.IFRAME: {
        const { src, alt } = contentItemObject;

        string += `<iframe ${attributeString} src="${src}" title="${alt}"></iframe>`;
        break;
      }
      case contentItemTypes.ILLUSTRATIVE_IMAGE: {
        const { src, alt, caption, dataId, filename } = contentItemObject;

        const source = dataId ? `assets/${filename}` : src;
        const assetId = dataId ? `data-id="${dataId}"` : '';

        string +=
          `<figure><div class="ows-figure-wrapper"><div class="ows-figure-image-wrapper" style="background-image: url('${source}');"><img ${attributeString} 
            ${assetId}
            src="${source}"
            alt="${alt}"/></div>
            <figcaption><a href="${source}">${caption}</a></figcaption></div></figure>`;
        break;
      }
      case contentItemTypes.DECORATIVE_IMAGE: {
        const { src, alt, dataId, filename } = contentItemObject;

        const source = dataId ? `assets/${filename}` : src;
        const assetId = dataId ? `data-id="${dataId}"` : '';

        string += `<div class="ows-decorative-image"><div class="ows-decorative-image-wrapper" style="background-image: url('${source}');"><img 
          ${attributeString}             
          ${assetId}
          src="${source}" 
          alt="${alt}"/></div></div>`;
        break;
      }
      case contentItemTypes.IMAGE_CONTAINER: {
        const images = yield convertContentItems(
          contentItemObject.childItemIds,
          headingLevel,
          `${indent}  `,
        );

        string += `<div class="ows-image-container"><div class="ows-image-container-wrapper" ${attributeString}>${images}\n${indent}</div></div>`;
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

  const slideString = `
      <div class="slide" data-level="${slideObject.level}">${contentItemsString}</div>
  `;

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
    yield put(updateDeckSuccess());
  }
  catch (e) {
    if (e.statusCode === 401) {
      yield put({ type: SIGNOUT });
    }
    console.log(e);
  }
}

function* updateDeckWatcher() {
  yield takeLatest(UPDATE_DECK, doUpdateDeck);
}

export default updateDeckWatcher;
