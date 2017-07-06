import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImportDeckForm from 'presentationals/components/deckManagement/ImportDeckForm';
import { importUploadError } from 'actions/userImportsActions';

function mapStateToProps(state) {
  return {
    authState: state.app.authentication,
    userImportState: state.app.userImports,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ importUploadError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportDeckForm);
