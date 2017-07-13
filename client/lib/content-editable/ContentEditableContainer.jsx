import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateContentBlock } from 'actions/contentBlockActions';

import ContentEditable from './ContentEditable';

function mapStateToProps(state, props) {
  return {
    contentBlock: state.entities.contentItems.byId[props.id],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateContentBlock }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentEditable);
