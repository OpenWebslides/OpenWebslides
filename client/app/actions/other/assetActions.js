export const UPLOAD_ASSET = 'UPLOAD_ASSET';

export function uploadAsset({ assetType, values, resolve, reject }) {
  return {
    type: UPLOAD_ASSET,
    meta: { assetType, values, resolve, reject },
  };
}
