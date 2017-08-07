import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  viewFirstSlide,
  viewPreviousSlide,
  viewNextSlide,
  viewLastSlide,
} from 'actions/app/presentation-view';

import PresentationViewToolbar from 'presentationals/components/presentation-view/PresentationViewToolbar';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    viewFirstSlide,
    viewPreviousSlide,
    viewNextSlide,
    viewLastSlide }, dispatch);
}

export default connect(null, mapDispatchToProps)(PresentationViewToolbar);
