export const UPLOAD_ASSETS = 'UPLOAD_ASSET';
export const UPLOAD_ASSETS_SUCCESS = 'UPLOAD_ASSET_SUCCESS';
export const UPLOAD_ASSETS_FAILURE = 'UPLOAD_ASSET_FAILURE';

export function uploadAssets(files) {
  return {
    type: UPLOAD_ASSETS,
    meta: { files },
  };
}
