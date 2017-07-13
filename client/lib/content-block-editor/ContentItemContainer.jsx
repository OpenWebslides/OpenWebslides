import { connect } from 'react-redux';

import ContentBlockEditor from './ContentBlockEditor';

function mapStateToProps(state, props) {
  return {
    contentType: state.entities.contentItems[props.id].contentType,
  };
}

export default connect(mapStateToProps)(ContentBlockEditor);
