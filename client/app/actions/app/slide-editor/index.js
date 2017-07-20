
export const TOGGLE_SLIDE_VIEW = 'TOGGLE_SLIDE_VIEW';

export function toggleSlideView(slideViewType) {
  return {
    type: TOGGLE_SLIDE_VIEW,
    payload: { slideViewType },
  }
}
