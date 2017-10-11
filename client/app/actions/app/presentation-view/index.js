
export const VIEW_PREVIOUS_SLIDE = 'VIEW_PREVIOUS_SLIDE';
export const VIEW_NEXT_SLIDE = 'VIEW_NEXT_SLIDE';
export const VIEW_FIRST_SLIDE = 'VIEW_FIRST_SLIDE';
export const VIEW_LAST_SLIDE = 'VIEW_LAST_SLIDE';
export const SET_ACTIVE_SLIDE = 'SET_ACTIVE_SLIDE';

export function viewPreviousSlide() {
  return {
    type: VIEW_PREVIOUS_SLIDE,
  };
}

export function viewNextSlide() {
  return {
    type: VIEW_NEXT_SLIDE,
  };
}

export function viewFirstSlide() {
  return {
    type: VIEW_FIRST_SLIDE,
  };
}

export function viewLastSlide() {
  return {
    type: VIEW_LAST_SLIDE,
  };
}

export function setActiveSlide(slideId) {
  return {
    type: SET_ACTIVE_SLIDE,
    payload: { slideId },
  };
}

