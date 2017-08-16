import _ from 'lodash';

export default function generateAttributesObject(contentItem) {
  const attributesMap = {
    viewType: 'data-view-type',
  };
  const attributes = {};

  Object.keys(attributesMap).forEach((key) => {
    attributes[attributesMap[key]] = _.isString(contentItem[key])
      ? contentItem[key].toLowerCase()
      : contentItem[key];
  });

  return attributes;
}
