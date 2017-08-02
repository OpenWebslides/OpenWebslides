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

    expect(generator.next({ attribute: 'string' }).value).toEqual('attribute="string"');

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

    expect(generator.next({}).value).toEqual(
      call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        ));

    expect(generator.next('paragraph text').value).toEqual('<p>paragraph text</p>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse a list item object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.LIST_ITEM,
      text: 'sic parvis magna',
      inlineProperties: [],
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual(
      call(getHTMLStringFromInlinePropertiesAndText,
          contentItemObject.inlineProperties,
          contentItemObject.text,
        ));

    expect(generator.next('sic parvis magna').value).toEqual('<li>sic parvis magna</li>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse an iframe object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.IFRAME,
      alt: 'sic parvis magna',
      src: 'www.youtube.com',
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual('<iframe src="www.youtube.com" alt="sic parvis magna"></iframe>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse an illustrative image object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.ILLUSTRATIVE_IMAGE,
      alt: 'sic parvis magna',
      src: 'www.url.com/decorative_image.jpg',
      caption: 'image caption',
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual('<figure><img src="www.url.com/decorative_image.jpg" alt="sic parvis magna"/><figcaption><a href="www.url.com/decorative_image.jpg">image caption</a></figcaption></figure>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse an decorative image object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.DECORATIVE_IMAGE,
      alt: 'sic parvis magna',
      src: 'www.url.com/illustrative_image.jpg',
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next({}).value).toEqual('<img src="www.url.com/illustrative_image.jpg" alt="sic parvis magna"/>');

    expect(generator.next().done).toBeTruthy();
  });

  it('can parse an ordered list object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.LIST,
      childItemIds: ['3-1-1', '3-1-2', '3-1-3'],
      ordered: true,
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next().value).toEqual(call(updateDeckSaga.convertContentItems, ['3-1-1', '3-1-2', '3-1-3'], 1));

    expect(generator.next('<li>this list item 1</li><li>this is list item 2</li>').value).toEqual('<ol><li>this list item 1</li><li>this is list item 2</li></ol>');
  });

  it('can parse an unordered list object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.LIST,
      childItemIds: ['3-1-1', '3-1-2', '3-1-3'],
      ordered: false,
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next().value).toEqual(call(updateDeckSaga.convertContentItems, ['3-1-1', '3-1-2', '3-1-3'], 1));

    expect(generator.next('<li>this list item 1</li><li>this is list item 2</li>').value).toEqual('<ul><li>this list item 1</li><li>this is list item 2</li></ul>');
  });

  it('can parse an section object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.SECTION,
      childItemIds: ['3-1-1', '3-1-2', '3-1-3'],
      ordered: false,
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next().value).toEqual(call(updateDeckSaga.convertContentItems, ['3-1-1', '3-1-2', '3-1-3'], 2));

    expect(generator.next('<p>this is a paragraph</p>').value).toEqual('<section><p>this is a paragraph</p></section>');
  });

  it('can parse an unordered list object to HTML', () => {
    const contentItemObject = {
      contentItemType: contentItemTypes.LIST,
      childItemIds: ['3-1-1', '3-1-2', '3-1-3'],
      ordered: false,
    };

    const generator = updateDeckSaga.convertContentItems(['1-1-1'], 1);

    expect(generator.next().value).toEqual(select(getContentItemById, '1-1-1'));

    expect(generator.next(contentItemObject).value).toEqual(
      call(generateAttributesObject, contentItemObject),
    );

    expect(generator.next().value).toEqual(call(updateDeckSaga.convertContentItems, ['3-1-1', '3-1-2', '3-1-3'], 1));

    expect(generator.next('<li>this list item 1</li><li>this is list item 2</li>').value).toEqual('<ul><li>this list item 1</li><li>this is list item 2</li></ul>');
  });
});
