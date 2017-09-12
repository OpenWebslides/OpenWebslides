export const IMPORT_UPLOAD_ERROR = 'IMPORT_UPLOAD_ERROR';

export function importUploadError(name, error) {
  return {
    type: IMPORT_UPLOAD_ERROR,
    payload: { name, error },
  };
}
