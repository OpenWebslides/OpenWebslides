import { connect } from 'react-redux';
import { getContentItemById } from 'selectors/entities/content-items';

import NavigationViewItem from './NavigationViewItem';
import generateAttributesObject from '../../helpers/generateAttributesObject';


function mapStateToProps(state, props) {
  const contentItem = getContentItemById(state, props.contentItemId);
  const attributes = generateAttributesObject(contentItem);

  return { contentItem, attributes };
}

export default connect(mapStateToProps)(NavigationViewItem);
