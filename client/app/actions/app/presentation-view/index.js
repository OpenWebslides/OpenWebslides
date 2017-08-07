
export const CHANGE_SLIDE = 'CHANGE_SLIDE';

export function changeSlide(changeValue) {
  return {
    type: CHANGE_SLIDE,
    payload: { changeValue },
  };
}
