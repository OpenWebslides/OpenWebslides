import { contentItemRenderTypes } from 'constants/contentItemRenderTypes';

import ContentRenderContentItem from './ContentRenderContentItem';
import DisplayRenderContentItem from './DisplayRenderContentItem';

export default {
  [contentItemRenderTypes.CONTENT]: ContentRenderContentItem,
  [contentItemRenderTypes.DISPLAY]: DisplayRenderContentItem,
};
