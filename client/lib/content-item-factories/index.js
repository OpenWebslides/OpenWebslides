
import { slideViewTypes } from 'constants/slideViewTypes';

import LiveViewFactory from './liveViewFactory';
import ContentViewFactory from './contentViewFactory';

function contentItemFactory(props) {
  let factory;

  switch (props.slideViewType) {
    case slideViewTypes.LIVE:
      factory = new LiveViewFactory();
      break;

    case slideViewTypes.CONTENT:
      factory = new ContentViewFactory();
      break;
    default:
      throw new Error('Unsupported view type');
  }

  return factory.createContentItem(props.contentItem);
}

export default contentItemFactory;
