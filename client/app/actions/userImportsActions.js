export const REQUEST_USER_IMPORTS = 'REQUEST_USER_IMPORTS';
export const REQUEST_USER_IMPORTS_SUCCESS = 'REQUEST_USER_IMPORTS_SUCCESS';
export const REQUEST_USER_IMPORTS_FAILURE = 'REQUEST_USER_IMPORTS_FAILURE';
export const IMPORT_UPLOAD_ERROR = 'IMPORT_UPLOAD_ERROR';

export function requestUserImports(userID) {
  return {
    type: REQUEST_USER_IMPORTS,
    meta: userID,
  };
}
export function receiveImports(list) {
  return {
    type: REQUEST_USER_IMPORTS_SUCCESS,
    payload: list,
  };
}

export function importUploadError(name, error) {
  return {
    type: IMPORT_UPLOAD_ERROR,
    payload: { name, error },
  };
}
