import { connect } from 'react-redux';

import ReadOnlyContentBlock from 'lib/convert-to-react/components/ReadOnlyContentBlock';

function mapStateToProps(state, props) {
  return {
    contentBlock: state.entities.contentBlocks.byId[props.id],
  };
}

export default connect(mapStateToProps)(ReadOnlyContentBlock);
