import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getContentItemById } from 'selectors/entities/content-items';

import ContentItem from './ContentItem';

function mapStateToProps(state, ownProps) {
  return {
    contentItem: getContentItemById(state, ownProps.contentItemId),
  };
}

function mapDispatchToProps() {
  return {

  };
}

const ContentItemContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItem);

ContentItemContainer.propTypes = {
  contentItemId: PropTypes.string.isRequired,
};

export default ContentItemContainer;
