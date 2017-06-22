import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addSlide, setActiveSlide } from 'actions/slideActions';

import NavigationPane from 'presentationals/components/editor/NavigationPane';

function mapStateToProps(state) {
  return {
    slides: state.entities.slides.byId,
    contentBlocks: state.entities.contentBlocks.byId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSlide, setActiveSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPane);
