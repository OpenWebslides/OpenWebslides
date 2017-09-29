import React from 'react';
import PropTypes from 'prop-types';

import { addConversation } from 'actions/entities/conversations';
import ConversationForm from './ConversationForm';

function AddConversationPanel(props) {
  const { closeAddConversationPanel } = props;

  return (
    <div>
      <button
        className="back-btn"
        onClick={closeAddConversationPanel}
      >
        <i className="fa fa-chevron-left fa-6" aria-hidden="true" />
      </button>
      <h3>
        <strong>Add conversation</strong>
      </h3>

      <ConversationForm
        submitSucceededAction={closeAddConversationPanel}
        cancelAction={closeAddConversationPanel}
        initialValues={{ conversationType: 'question' }}
        onSubmit={(values, dispatch) => {
          return new Promise((resolve, reject) => {
            dispatch(addConversation({ values, resolve, reject }));
          });
        }}
      />
    </div>
  );
}

AddConversationPanel.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  showConversationPanel: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitSucceeded: PropTypes.bool.isRequired,
  closeAddConversationPanel: PropTypes.func.isRequired,
};

AddConversationPanel.defaultProps = {
  error: '',
};

export default AddConversationPanel;
