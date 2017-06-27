import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSlide } from 'actions/slideActions';
import { setActiveContentBlock } from 'actions/contentBlockActions';

import EditableContentBlock from 'lib/convert-to-react/components/EditableContentBlock';

function mapStateToProps(state, props) {
  return {
    activeContentBlock: state.app.editor.contentBlocks.active,
    contentBlockState: state.entities.contentBlocks.byId[props.id].data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateSlide, setActiveContentBlock }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EditableContentBlock,
);
