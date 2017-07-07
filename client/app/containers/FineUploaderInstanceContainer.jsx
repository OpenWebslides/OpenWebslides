import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { importUploadError } from 'actions/fineUploaderActions';
import FineUploaderInstance from 'presentationals/components/deckManagement/FineUploaderInstance';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ importUploadError }, dispatch);
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.app.authentication.isAuthenticated,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  FineUploaderInstance,
);
