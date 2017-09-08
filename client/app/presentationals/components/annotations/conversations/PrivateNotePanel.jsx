import React from 'react';
import PropTypes from 'prop-types';

import { addConversation } from 'actions/entities/conversations';
import ConversationForm from './ConversationForm';

function PrivateNotePanel(props) {
  const { closePrivateNotePanel } = props;

  return (
    <div>
      <a href="#" className="back-btn" onClick={closePrivateNotePanel}><i className="fa fa-chevron-left fa-6" aria-hidden="true" /></a>
      <h3><strong>Add Private Note</strong></h3>

      <ConversationForm
        submitSucceededAction={closePrivateNotePanel}
        secret={true}
        initialValues={{ conversationType: 'note' }}
        cancelAction={closePrivateNotePanel}
        onSubmit={(values, dispatch) => {
          return new Promise((resolve, reject) => {
            dispatch(addConversation({ values, secret: true, resolve, reject }));
          });
        }}
      />
    </div>
  );
}

PrivateNotePanel.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showConversationPanel: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  closePrivateNotePanel: PropTypes.func.isRequired,
};

PrivateNotePanel.defaultProps = {
  error: '',
};

export default PrivateNotePanel;
