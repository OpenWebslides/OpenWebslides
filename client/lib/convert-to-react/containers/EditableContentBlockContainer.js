import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSlides, updateSlide } from 'actions/slideActions';

import EditableContentBlock from 'lib/convert-to-react/components/EditableContentBlock';

function mapStateToProps(state, props) {
  return {
    contentBlock: state.entities.contentBlocks.byId[props.id],
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSlides, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EditableContentBlock,
);
