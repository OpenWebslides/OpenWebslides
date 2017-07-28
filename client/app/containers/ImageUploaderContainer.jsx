import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { uploadAssets } from 'actions/other/assetActions';

import ImageUploader from 'presentationals/components/shared/uploaders/ImageUploader';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ uploadAssets }, dispatch);
}

export default connect(null, mapDispatchToProps)(ImageUploader);
