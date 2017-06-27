import { connect } from 'react-redux';
import debounceRender from 'react-debounce-render';

import ReadOnlyContentBlock from 'lib/convert-to-react/components/ReadOnlyContentBlock';

function mapStateToProps(state, props) {
  return {
    contentBlock: state.entities.contentBlocks.byId[props.id],
  };
}

const debouncedComponent = debounceRender(ReadOnlyContentBlock);

export default connect(mapStateToProps)(debouncedComponent);
