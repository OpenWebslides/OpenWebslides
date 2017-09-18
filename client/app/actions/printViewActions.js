export const CHANGE_IMAGE_OPTIONS = 'CHANGE_IMAGE_OPTIONS';
export const CHANGE_IFRAME_OPTIONS = 'CHANGE_IFRAME_OPTIONS';
export const CHANGE_DECORATIVE_IMAGE_OPTIONS = 'CHANGE_DECORATIVE_IMAGE_OPTIONS';
export const CHANGE_ANNOTATIONS_OPTIONS = 'CHANGE_ANNOTATIONS_OPTIONS';

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

export function changeDecorativeImagePref(choice) {
  return {
    type: CHANGE_DECORATIVE_IMAGE_OPTIONS,
    payload: choice,
  };
}

export function changeAnnotationsPref(choice) {
  return {
    type: CHANGE_ANNOTATIONS_OPTIONS,
    payload: choice,
  };
}
