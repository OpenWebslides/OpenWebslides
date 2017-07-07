import { connect } from 'react-redux';
import FineUploaderErrors from 'presentationals/components/deckManagement/FineUploaderErrors';

function mapStateToProps(state) {
  return {
    errors: state.app.fineUploader.errors,
  };
}

export default connect(mapStateToProps)(FineUploaderErrors);
