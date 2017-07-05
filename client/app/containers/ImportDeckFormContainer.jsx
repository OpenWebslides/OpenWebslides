import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImportDeckForm from 'presentationals/components/deckManagement/ImportDeckForm';

function mapStateToProps(state) {
  return {
    authState: state.app.authentication,
    deckImportState: state.app.deckImport,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportDeckForm);
