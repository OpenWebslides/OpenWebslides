export const OPEN_ANNOTATION_MODE = 'OPEN_ANNOTATION_MODE';
export const CLOSE_ANNOTATION_MODE = 'CLOSE_ANNOTATION_MODE';

export function openAnnotationMode() {
  return { type: OPEN_ANNOTATION_MODE };
}

export function closeAnnotationMode() {
  return { type: CLOSE_ANNOTATION_MODE };
}
