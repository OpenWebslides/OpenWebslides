import React from 'react';
import { connect } from 'react-redux';

import { getContentItemById } from 'selectors/entities/content-items';

export default function contentItemHOC(WrappedComponent) {
  function contentItemContainer(props) {
    console.log(props);
    return <WrappedComponent {...props} />;
  }

  function mapStateToProps(state, props) {
    const contentItem = getContentItemById(state, props.contentItemId);

    return ({ contentItem });
  }

  return connect(mapStateToProps)(contentItemContainer);
}
