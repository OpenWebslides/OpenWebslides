import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setEditingConversation, unsetEditingConversation } from 'actions/app/annotations';
import { updateConversation } from 'actions/entities/conversations';
import ConversationForm from './ConversationForm';

function ConversationHeader(props) {
  const {
    editingConversation,
    user,
    title,
    text,
    byCurrentUser,
    deleted,
    scrollToForm,
    conversationType,
  } = props;

  if (editingConversation) {
    return (
      <ConversationForm
        initialValues={{ title, text, conversationType }}
        submitText="Save"
        cancelAction={props.unsetEditingConversation}
        rows={4}
        includeTypeChoice={false}
        onSubmit={(values, dispatch) => {
          return new Promise((resolve, reject) => {
            dispatch(updateConversation({ values, resolve, reject }));
          });
        }}
      />
    );
  }

  return (
    <div>
      <p><strong>{user.firstName} {user.lastName}</strong> wrote:</p>

      <h3>{title}</h3>
      <p>{text}</p>

      {byCurrentUser && !deleted &&
        <button onClick={props.setEditingConversation}>Edit</button>}

      { deleted ?
        <p> Adding comments is disabled for deleted conversations.</p> :
        <button onClick={() => scrollToForm()}>Add comment</button>}
      <hr />
    </div>
  );
}

export default compose(
  connect(
    (state) => {
      return { editingConversation: state.app.annotations.editingConversation };
    },
    (dispatch) => {
      return bindActionCreators({ setEditingConversation, unsetEditingConversation }, dispatch);
    },
  ),
)(ConversationHeader);

ConversationHeader.propTypes = {
  editingConversation: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  byCurrentUser: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  setEditingConversation: PropTypes.func.isRequired,
  unsetEditingConversation: PropTypes.func.isRequired,
  scrollToForm: PropTypes.func.isRequired,
  closeConversationCommentList: PropTypes.func.isRequired,
  conversationType: PropTypes.string.isRequired,
};
