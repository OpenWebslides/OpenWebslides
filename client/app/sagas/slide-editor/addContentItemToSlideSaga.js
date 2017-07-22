import { takeEvery, select, put } from 'redux-saga/effects';

import { contentItemTypes } from 'constants/contentItemTypes';

import { ADD_CONTENT_ITEM_TO_SLIDE } from 'actions/entities/slides';
import { addContentItem } from 'actions/entities/content-items';
import { getSlideById } from 'selectors/entities/slides';
import { getContentItemById } from 'selectors/entities/content-items';
import { generateContentItemId } from 'lib/convert-to-state/generateIds';

const plaintextContentItemTypes = [
  contentItemTypes.TITLE,
  contentItemTypes.PARAGRAPH,
  contentItemTypes.LIST_ITEM,
];
const sectionContentItemTypes = [
  contentItemTypes.SECTION,
  contentItemTypes.ASIDE,
];

function getPropsForContentItemType(contentItemType) {
  let props = {};

  if (Array.indexOf(plaintextContentItemTypes, contentItemType) !== -1) {
    props = {
      text: '',
      inlineProperties: [],
    };
  } else if (Array.indexOf(sectionContentItemTypes, contentItemType) !== -1) {
    props = {
      childItemIds: [],
    };
  } else if (contentItemType === contentItemTypes.LIST) {
    props = {
      ordered: false,
      childItemIds: [],
    };
  } else if (contentItemType === contentItemTypes.ILLUSTRATIVE_IMAGE) {
    props = {
      src: '',
      altText: '',
      caption: '',
    };
  } else if (contentItemType === contentItemTypes.DECORATIVE_IMAGE) {
    props = {
      src: '',
      altText: '',
    };
  } else if (contentItemType === contentItemTypes.IFRAME) {
    props = {
      src: '',
      altText: '',
    };
  } else {
    console.error(`Unrecognized contentItemType: ${contentItemType}`);
  }

  return props;
}

function* findLastSectionContentItemInListOfContentItemIds(contentItemId, childItemIds) {
  // If there are no suitable child items, this is the last possible nested section.
  let lastSectionContentItemId = contentItemId;

  if (childItemIds.length > 0) {
    // Get the last childItem in the list.
    const lastChildItem = yield select(
      getContentItemById,
      childItemIds[childItemIds.length - 1]
    );

    // If the last childItem in the list is a section.
    if (Array.indexOf(sectionContentItemTypes, lastChildItem.contentItemType) !== -1) {
      // See if there is another suitable section nested inside it.
      // Note: this returns the current lastContentItem.id if no suitable section can be found.
      lastSectionContentItemId = yield findLastSectionContentItemInListOfContentItemIds(
        lastChildItem.id,
        lastChildItem.childItemIds
      );
    }
  }

  return lastSectionContentItemId;
}

function* doAddContentItemToSlide(action) {
  try {
    const slide = yield select(getSlideById, action.meta.slideId);
    const contentItemProps = getPropsForContentItemType(action.meta.contentItemType);
    let contentItemId = generateContentItemId(slide.id, slide.contentItemSequence);

    // See if there is an existing section on the slide to which we could add the new contentItem.
    // Note: this sets parentItemId to null if there is no suitable section.
    let parentItemId = yield findLastSectionContentItemInListOfContentItemIds(null, slide.contentItemIds);

    // Some contentItemTypes require a child element to be automatically added.
    let childItemId = null;
    let childItemType = null;
    let childItemProps = null;

    // If the new contentItem is a title, we need to add a new section for it.
    if (action.meta.contentItemType === contentItemTypes.TITLE) {
      const sectionProps = getPropsForContentItemType(contentItemTypes.SECTION);
      // Since the section should be added first, give it the id we just generated.
      const sectionItemId = contentItemId;
      // Generate a new id for the contentItem.
      contentItemId = generateContentItemId(slide.id, slide.contentItemSequence + 1);

      // Add the new section to the state.
      yield put(addContentItem(sectionItemId, contentItemTypes.SECTION, sectionProps, slide.id, parentItemId));

      // Use the new section as the parent item for the new contentItem.
      parentItemId = sectionItemId;
    }
    // If the new contentItem is a list, we need to automatically add the first list item inside it.
    else if (action.meta.contentItemType === contentItemTypes.LIST) {
      childItemId = generateContentItemId(slide.id, slide.contentItemSequence + 1);
      childItemType = contentItemTypes.LIST_ITEM;
      childItemProps = getPropsForContentItemType(childItemType);
    }

    yield put(addContentItem(contentItemId, action.meta.contentItemType, contentItemProps, slide.id, parentItemId));

    if (childItemId !== null) {
      yield put(addContentItem(childItemId, childItemType, childItemProps, slide.id, contentItemId));
    }

  } catch(e) {
    console.error(e);
  }
}

function* addContentItemToSlideWatcher() {
  yield takeEvery(ADD_CONTENT_ITEM_TO_SLIDE, doAddContentItemToSlide);
}

export default addContentItemToSlideWatcher;
