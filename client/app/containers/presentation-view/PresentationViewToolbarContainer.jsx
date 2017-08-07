import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeSlide } from 'actions/app/presentation-view';

import PresentationViewToolbar from 'presentationals/components/presentation-view/PresentationViewToolbar';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeSlide }, dispatch);
}

export default connect(null, mapDispatchToProps)(PresentationViewToolbar);
