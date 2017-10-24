import { call, put, select } from 'redux-saga/effects';
import faker from 'faker';

import { moveContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemsById } from 'selectors/entities/content-items';

import { directions } from 'constants/directions';

import { doMoveContentItemOnSlide } from 'sagas/slide-editor/moveContentItemOnSlideSaga';

describe('Move Content Item Saga', () => {
  it('has a happy path', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-2';
    const ancestorItemIds = ['1-1-0'];
    const direction = directions.DOWN;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2', '1-1-3'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { inlineProperties: [], text: 'Paragraph 1', contentItemType: 'PARAGRAPH', id: '1-1-2', viewType: 'LIVE' },
      '1-1-3': { inlineProperties: [], text: 'Paragraph 2', contentItemType: 'PARAGRAPH', id: '1-1-3', viewType: 'LIVE' },
    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId: '1-1', contentItemId, ancestorItemIds, direction },
    });

    expect(generator.next().value).toEqual(select(getSlideById, slideId));
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0'] }).value).toEqual(select(getContentItemsById));

    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-2']);

    expect(generator.next(contentItemsById['1-1-2']).value).toEqual('1-1-2');
    expect(generator.next('1-1-2').value).toEqual(['1-1-0']);

    expect(generator.next(['1-1-0']).value).toEqual('1-1-0');

    expect(generator.next('1-1-0').value).toEqual({ isMoveOk: true, newParentItemId: '1-1-0', newPreviousItemId: '1-1-3' });

    expect(generator.next({ isMoveOk: true, newParentItemId: '1-1-0', newPreviousItemId: '1-1-3' }).value).toEqual(false);

    expect(generator.next(false).value).toEqual(put(moveContentItem(
      '1-1-2',
      slideId,
      '1-1-0',
      '1-1-0',
      '1-1-3',
    )));


    expect(generator.next().done).toBeTruthy();
  });

  it('removes section when last content is moved from it', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-5';
    const ancestorItemIds = ['1-1-4'];
    const direction = directions.RIGHT;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { inlineProperties: [], text: 'Paragraph 1', contentItemType: 'PARAGRAPH', id: '1-1-2', viewType: 'LIVE' },
      '1-1-4': { childItemIds: ['1-1-5'], contentItemType: 'SECTION', id: '1-1-4', viewType: 'LIVE' },
      '1-1-5': { inlineProperties: [], text: 'Title 2', contentItemType: 'TITLE', id: '1-1-5', viewType: 'LIVE' },
    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId: '1-1', contentItemId, ancestorItemIds, direction },
    });

    expect(generator.next().value).toEqual(select(getSlideById, slideId));
    expect(generator.next({ contentItemSequence: 6, id: '1-1', level: 0, contentItemIds: ['1-1-0', '1-1-4'] }).value).toEqual(select(getContentItemsById));

    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-5']);

    expect(generator.next(contentItemsById['1-1-5']).value).toEqual('1-1-4');

    expect(generator.next('1-1-4').value).toEqual([]);

    expect(generator.next([]).value).toEqual(null);

    expect(generator.next('1-1-4').value).toEqual({ isMoveOk: true, newParentItemId: '1-1-0', newPreviousItemId: '1-1-2' });

    expect(generator.next({ isMoveOk: true, newParentItemId: '1-1-0', newPreviousItemId: '1-1-2' }).value).toEqual(false);
    expect(generator.next().value).toEqual(true);

    expect(generator.next(false).value).toEqual(put(moveContentItem(
      '1-1-4',
      slideId,
      '1-1-4',
      '1-1-0',
      '1-1-2',
    )));


    expect(generator.next().done).toBeTruthy();
  });

  it('does not allow illegal moves', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-2';
    const ancestorItemIds = ['1-1-0'];
    const direction = directions.LEFT;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2', '1-1-3'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { inlineProperties: [], text: 'Paragraph 1', contentItemType: 'PARAGRAPH', id: '1-1-2', viewType: 'LIVE' },
      '1-1-3': { inlineProperties: [], text: 'Paragraph 2', contentItemType: 'PARAGRAPH', id: '1-1-3', viewType: 'LIVE' },
    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId: '1-1', contentItemId, ancestorItemIds, direction },
    });

    expect(generator.next().value).toEqual(select(getSlideById, slideId));
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0'] }).value).toEqual(select(getContentItemsById));

    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-2']);

    expect(generator.next(contentItemsById['1-1-2']).value).toEqual('1-1-2');
    expect(generator.next('1-1-2').value).toEqual(['1-1-0']);

    expect(generator.next(['1-1-0']).value).toEqual('1-1-0');

    expect(generator.next('1-1-0').value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null })
      .done).toBeTruthy();
  });
});
