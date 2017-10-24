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

  it('does not allow content items to be moved below a section', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-2';
    const ancestorItemIds = ['1-1-0'];
    const direction = directions.DOWN;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { inlineProperties: [], text: 'Paragraph', contentItemType: 'PARAGRAPH', id: '1-1-2', viewType: 'LIVE' },
    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId, contentItemId, ancestorItemIds, direction },
    });

    // Select slide object
    expect(generator.next().value).toEqual(select(getSlideById, slideId));

    // Returned: slide object
    // Select content items
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0'] }).value).toEqual(select(getContentItemsById));

    // Returned: content item objects
    // Select content item object based on content item id
    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-2']);

    // Returned: content item object based on the content item id
    // Select content item id to move
    expect(generator.next(contentItemsById['1-1-2']).value).toEqual('1-1-2');

    // Returned: content item id that we want to move
    // Select the ancestor item array of strings
    expect(generator.next('1-1-2').value).toEqual(['1-1-0']);

    // Returned: ancestor item array
    // Select the last ancestor item id from the ancestor item array
    expect(generator.next(['1-1-0']).value).toEqual('1-1-0');

    // Returned: last ancestor item id from the ancestor item array
    // Check if the move is valid if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    expect(generator.next('1-1-0').value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    // returned: the isMoveOk boolean, the new parentItemId and the new previousItemId
    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null }).done).toBeTruthy();
  });

  it('does not allow content items that are not list items to be moved inside a list', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-5';
    const ancestorItemIds = ['1-1-0'];
    const direction = directions.RIGHT;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2', '1-1-5'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { childItemIds: ['1-1-3', '1-1-4'], contentItemType: 'LIST', id: '1-1-2', viewType: 'LIVE' },
      '1-1-3': { inlineProperties: [], text: 'List item', contentItemType: 'LIST_ITEM', id: '1-1-3', viewType: 'LIVE' },
      '1-1-4': { inlineProperties: [], text: 'List item', contentItemType: 'LIST_ITEM', id: '1-1-4', viewType: 'LIVE' },
      '1-1-5': { inlineProperties: [], text: 'Paragraph', contentItemType: 'PARAGRAPH', id: '1-1-5', viewType: 'LIVE' },

    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId, contentItemId, ancestorItemIds, direction },
    });

    // Select slide object
    expect(generator.next().value).toEqual(select(getSlideById, slideId));

    // Returned: slide object
    // Select content items
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0'] }).value).toEqual(select(getContentItemsById));

    // Returned: content item objects
    // Select content item object based on content item id
    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-5']);

    // Returned: content item object based on the content item id
    // Select content item id to move
    expect(generator.next(contentItemsById['1-1-5']).value).toEqual('1-1-5');

    // Returned: content item id that we want to move
    // Select the ancestor item array of strings
    expect(generator.next('1-1-5').value).toEqual(['1-1-0']);

    // Returned: ancestor item array
    // Select the last ancestor item id from the ancestor item array
    expect(generator.next(['1-1-0']).value).toEqual('1-1-0');

    // Returned: last ancestor item id from the ancestor item array
    // Check if the move is valid if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    expect(generator.next('1-1-0').value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    // returned: the isMoveOk boolean, the new parentItemId and the new previousItemId
    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null }).done).toBeTruthy();
  });

  it('does not allow list items to be moved outside lists', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-4';
    const ancestorItemIds = ['1-1-0', '1-1-2'];
    const direction = directions.DOWN;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2', '1-1-5'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-2': { childItemIds: ['1-1-3', '1-1-4'], contentItemType: 'LIST', id: '1-1-2', viewType: 'LIVE' },
      '1-1-3': { inlineProperties: [], text: 'List item', contentItemType: 'LIST_ITEM', id: '1-1-3', viewType: 'LIVE' },
      '1-1-4': { inlineProperties: [], text: 'List item', contentItemType: 'LIST_ITEM', id: '1-1-4', viewType: 'LIVE' },
      '1-1-5': { inlineProperties: [], text: 'Paragraph', contentItemType: 'PARAGRAPH', id: '1-1-5', viewType: 'LIVE' },

    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId, contentItemId, ancestorItemIds, direction },
    });

    // Select slide object
    expect(generator.next().value).toEqual(select(getSlideById, slideId));

    // Returned: slide object
    // Select content items
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0'] }).value).toEqual(select(getContentItemsById));

    // Returned: content item objects
    // Select content item object based on content item id
    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-4']);

    // Returned: content item object based on the content item id
    // Select content item id to move
    expect(generator.next(contentItemsById['1-1-4']).value).toEqual('1-1-4');

    // Returned: content item id that we want to move
    // Select the ancestor item array of strings
    expect(generator.next('1-1-4').value).toEqual(['1-1-0', '1-1-2']);

    // Returned: ancestor item array
    // Select the last ancestor item id from the ancestor item array
    expect(generator.next(['1-1-0', '1-1-2']).value).toEqual('1-1-2');

    // Returned: last ancestor item id from the ancestor item array
    // Check if the move is valid if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    expect(generator.next('1-1-2').value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    // returned: the isMoveOk boolean, the new parentItemId and the new previousItemId
    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null }).done).toBeTruthy();
  });

  it('does not allow images to be moved outside of their imageContainers', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-4';
    const ancestorItemIds = ['1-1-3'];
    const direction = directions.DOWN;

    const contentItemsById = {
      '1-1-0': { childItemIds: ['1-1-1', '1-1-2', '1-1-5'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
      '1-1-3': { childItemIds: ['1-1-4'], imageType: 'ILLUSTRATIVE_IMAGE', contentItemType: 'IMAGE_CONTAINER', id: '1-1-3', viewType: 'LIVE' },
      '1-1-4': { inlineProperties: [], alt: 'alt text', caption: 'caption', src: 'url', contentItemType: 'ILLUSTRATIVE_IMAGE', id: '1-1-4', viewType: 'LIVE' },

    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId, contentItemId, ancestorItemIds, direction },
    });

    // Select slide object
    expect(generator.next().value).toEqual(select(getSlideById, slideId));

    // Returned: slide object
    // Select content items
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-0', '1-1-2', '1-1-3'] }).value).toEqual(select(getContentItemsById));

    // Returned: content item objects
    // Select content item object based on content item id
    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-4']);

    // Returned: content item object based on the content item id
    // Select content item id to move
    expect(generator.next(contentItemsById['1-1-4']).value).toEqual('1-1-4');

    // Returned: content item id that we want to move
    // Select the ancestor item array of strings
    expect(generator.next('1-1-4').value).toEqual(['1-1-3']);

    // Returned: ancestor item array
    // Select the last ancestor item id from the ancestor item array
    expect(generator.next(['1-1-3']).value).toEqual('1-1-3');

    // Returned: last ancestor item id from the ancestor item array
    // Check if the move is valid if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    expect(generator.next('1-1-3').value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    // returned: the isMoveOk boolean, the new parentItemId and the new previousItemId
    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null }).done).toBeTruthy();
  });

  it('does not allow sections to be moved above content items that are not sections', () => {
    const slideId = '1-1';
    const contentItemId = '1-1-1';
    const ancestorItemIds = ['1-1-0'];
    const direction = directions.UP;

    const contentItemsById = {
      '1-1-2': { inlineProperties: [], text: 'Paragraph', contentItemType: 'PARAGRAPH', id: '1-1-2', viewType: 'LIVE' },
      '1-1-0': { childItemIds: ['1-1-1'], contentItemType: 'SECTION', id: '1-1-0', viewType: 'LIVE' },
      '1-1-1': { inlineProperties: [], text: 'Title', contentItemType: 'TITLE', id: '1-1-1', viewType: 'LIVE' },
    };

    const generator = doMoveContentItemOnSlide({
      meta: { slideId, contentItemId, ancestorItemIds, direction },
    });

    // Select slide object
    expect(generator.next().value).toEqual(select(getSlideById, slideId));

    // Returned: slide object
    // Select content items
    expect(generator.next({ contentItemSequence: 4, id: '1-1', level: 0, contentItemIds: ['1-1-2', '1-1-0'] }).value).toEqual(select(getContentItemsById));

    // Returned: content item objects
    // Select content item object based on content item id
    expect(generator.next(contentItemsById).value).toEqual(contentItemsById['1-1-1']);

    // Returned: content item object based on the content item id
    // Select content item id to move
    // Since the content item is a title, we select the whole section to be moved
    // in other words, last of the ancestor Item id array
    expect(generator.next(contentItemsById['1-1-1']).value).toEqual('1-1-0');

    // Returned: content item id that we want to move
    // select new ancestor item ids
    // Since the content item is a title and we are moving the whole section,
    // we remove the section from the ancestor item id array and return the array
    expect(generator.next('1-1-0').value).toEqual([]);

    // Returned: ancestor item array
    // Select the last ancestor item id from the ancestor item array
    expect(generator.next([]).value).toEqual(null);

    // Returned: last ancestor item id from the ancestor item array
    // Check if the move is valid if so, get the new parentItemId and the new
    // previousItemId where the contentItem is to be moved to.
    expect(generator.next(null).value).toEqual({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null });

    // returned: the isMoveOk boolean, the new parentItemId and the new previousItemId
    expect(generator.next({ isMoveOk: false, newParentItemId: null, newPreviousItemId: null }).done).toBeTruthy();
  });
});
