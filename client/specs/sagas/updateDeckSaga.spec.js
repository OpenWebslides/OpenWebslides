import faker from 'faker';
import { call, select } from 'redux-saga/effects';

import { getActiveDeckId } from 'selectors/app/slide-editor';
import { getDeckById } from 'selectors/entities/decks';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';

import * as updateDeckSaga from 'sagas/updateDeckSaga';

import { contentItemTypes } from 'constants/contentItemTypes';
import { generateAttributesObject } from 'lib/content-item/ContentItemContainer';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

describe('convertToHTML', () => {
  it('wraps the converted slide HTML string', () => {
    const deckObject = { slideIds: ['1-1', '1-2'] };

    const generator = updateDeckSaga.convertToHTML(deckObject);

    expect(generator.next().value).toEqual(call(updateDeckSaga.convertSlides, deckObject.slideIds));

    expect(generator.next(['<h1>string</h1>', '<h2>string</h2>']).value).toEqual('<h1>string</h1><h2>string</h2>');

    expect(generator.next('<h1>string</h1><h2>string</h2>').value).toEqual('<header class="caption"><h1>Presentation</h1><p><a href="">Author</a></p></header><h1>string</h1><h2>string</h2><div class="progress"></div>');

    expect(generator.next().done).toBeTruthy();
  });
});

describe('convertSlides', () => {
  it('parses slide state objects to correct slide HTML strings', () => {
    const generator = updateDeckSaga.convertSlides(['1-1']);

    expect(generator.next().value).toEqual(select(getSlideById, '1-1'));

    expect(generator.next({ level: 1, contentItemIds: ['1-1-1', '1-1-2'] }).value).toEqual(call(updateDeckSaga.convertContentItems, ['1-1-1', '1-1-2'], 1));

    expect(generator.next('content').value).toEqual('<div class="slide" data-level="1">content</div>');

    expect(generator.next().done).toBeTruthy();
  });
});

describe('convertContentItems', () => {
  it('can parse a title object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.TITLE,
      text: 'sic parvis magna',
      inlineProperties: [],
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual('');

    expect(generator.next('attribute="string"').value).toEqual(
      call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        ));

    expect(generator.next('title text').value).toEqual('<h1 attribute="string">title text</h1>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse a paragraph object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.PARAGRAPH,
      text: 'sic parvis magna',
      inlineProperties: [],
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual('');

    expect(generator.next('attribute="string"').value).toEqual(
      call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        ));

    expect(generator.next('paragraph text').value).toEqual('<p attribute="string">paragraph text</p>');

    expect(generator.next().done).toBeTruthy();
  });
});
