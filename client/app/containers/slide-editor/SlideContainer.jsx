import { connect } from 'react-redux';

import { getSlideById } from 'selectors/entities/slides';

import Slide from 'presentationals/components/slide-editor/Slide';

function mapStateToProps(state, props) {
  return {
    slide: getSlideById(state, props.id),
  };
}

export default connect(mapStateToProps)(Slide);
