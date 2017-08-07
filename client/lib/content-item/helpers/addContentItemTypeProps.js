import { contentItemTypes } from 'constants/contentItemTypes';

export default function addContentItemTypeProps(contentItemType) {
  switch (contentItemType) {
    case contentItemTypes.LIST_ITEM:
    case contentItemTypes.PARAGRAPH:
    case contentItemTypes.TITLE:
      return { hasInlineProperties: true, textPropName: 'text' };

    case contentItemTypes.IMAGE:
    case contentItemTypes.IFRAME:
      return { hasInlineProperties: false, textPropName: 'src' };

    default:
      return {};
  }
}
