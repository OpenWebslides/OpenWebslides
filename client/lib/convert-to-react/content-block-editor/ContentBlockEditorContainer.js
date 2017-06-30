import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSlide } from 'actions/slideActions';
import { updateDeck } from 'actions/deckActions';
import { setActiveContentBlock } from 'actions/contentBlockActions';

import ContentBlockEditor from 'lib/convert-to-react/content-block-editor/ContentBlockEditor';

function mapStateToProps(state, props) {
  return {
    activeContentBlock: state.app.editor.contentBlocks.active,
    contentBlockState: state.entities.contentBlocks.byId[props.id].data,
    contentBlockType: state.entities.contentBlocks.byId[props.id].type,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateSlide, setActiveContentBlock, updateDeck },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentBlockEditor);
