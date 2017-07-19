import { connect } from 'react-redux';

import { getContentItemById } from 'selectors/entities/content-items';

import ContentItem from './ContentItem';

function mapStateToProps(state, props) {
  return {
    contentItem: getContentItemById(state, props.contentItemId),
  };
}

export default connect(mapStateToProps)(ContentItem);
