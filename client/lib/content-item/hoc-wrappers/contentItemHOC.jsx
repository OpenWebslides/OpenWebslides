import React from 'react';
import { connect } from 'react-redux';

import { getContentItemById } from 'selectors/entities/content-items';
import generateAttributesObject from 'lib/content-item/helpers/generateAttributesObject';

export default function contentItemHOC(WrappedComponent) {
  function contentItemContainer(props) {
    return <WrappedComponent {...props} />;
  }

  function mapStateToProps(state, props) {
    const contentItem = getContentItemById(state, props.contentItemId);
    const attributes = generateAttributesObject(contentItem);

    return ({
      contentItem,
      attributes,
    });
  }
  return connect(mapStateToProps)(contentItemContainer);
}
