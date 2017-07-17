export const CHANGE_IMAGE_OPTIONS = 'CHANGE_IMAGE_OPTIONS';
export const CHANGE_IFRAME_OPTIONS = 'CHANGE_IFRAME_OPTIONS';

export function changeImagePref(choice) {
  return {
    type: CHANGE_IMAGE_OPTIONS,
    payload: choice,
  };
}

export function changeIframePref(choice) {
  return {
    type: CHANGE_IFRAME_OPTIONS,
    payload: choice,
  };
}
