import _ from 'lodash';

export default function generateAttributesObject(contentItem) {
  const attributesMap = {
    viewType: 'data-view-type',
    imageType: 'data-image-type',
  };
  const attributes = {};

  Object.keys(attributesMap).forEach((key) => {
    if (contentItem[key] !== undefined) {
      attributes[attributesMap[key]] = _.isString(contentItem[key])
        ? contentItem[key].toLowerCase()
        : contentItem[key];
    }
  });

  return attributes;
}
