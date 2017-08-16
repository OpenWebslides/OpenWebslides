import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getContentItemById } from 'selectors/entities/content-items';
import generateAttributesObject from 'lib/content-item/helpers/generateAttributesObject';

export default function contentItemHOC(WrappedComponent) {
  class contentItemContainer extends PureComponent {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state, props) {
    const contentItem = state.entities.contentItems.byId[props.contentItemId];
    // const attributes = generateAttributesObject(contentItem);

    return ({
      contentItem,

    });
  }
  return connect(mapStateToProps)(contentItemContainer);
}
