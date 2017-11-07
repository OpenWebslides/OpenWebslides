import _ from 'lodash';
import { createSelector } from 'reselect';
import { getActiveSlideId } from 'selectors/app/presentation';
import { getContentItemsById } from 'selectors/entities/content-items';

export const getCourseNotesForActiveSlide = createSelector(
  getActiveSlideId,
  getContentItemsById,
  (activeSlideId, contentItems) => {
    const courseNoteContentItems = _.filter(contentItems, { slideId: activeSlideId, viewType: 'COURSE' });

    const courseNotes = courseNoteContentItems.map((contentItem) => {
      return contentItem.text;
    });

    return courseNotes;
  },
);

export const currentSlideHasCourseNotes = createSelector(
  getActiveSlideId,
  getContentItemsById,
  (activeSlideId, contentItems) => {
    return _.some(contentItems, { slideId: activeSlideId, viewType: 'COURSE' });
  },
);
