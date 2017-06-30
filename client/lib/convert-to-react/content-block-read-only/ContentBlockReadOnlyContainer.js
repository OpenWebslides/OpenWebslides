import { connect } from 'react-redux';
import debounceRender from 'react-debounce-render';

import ContentBlockReadOnly from 'lib/convert-to-react/content-block-read-only/ContentBlockReadOnly';

function mapStateToProps(state, props) {
  return {
    contentBlock: state.entities.contentBlocks.byId[props.id],
  };
}

const debouncedComponent = debounceRender(ContentBlockReadOnly);

export default connect(mapStateToProps)(debouncedComponent);
