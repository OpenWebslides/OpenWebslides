import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { SET_EDITING_CONVERSATION } from 'actions/app/annotations';
import InlineEditConversationFormContainer from
  'containers/annotations/conversation-comments/InlineEditConversationFormContainer';

function ConversationHeader(props) {
  const {
    editingConversation,
    user,
    title,
    text,
    byCurrentUser,
    deleted,
    setEditingConversation,
    scrollToForm,
    conversationType,
  } = props;

  console.log(props);
  if (editingConversation) {
    return (
      <InlineEditConversationFormContainer
        initialValues={{ title, text, conversationType }}
      />
    );
  }

  return (
    <div>
      <p><strong>{user.firstName} {user.lastName}</strong> wrote:</p>

      <h3>{title}</h3>
      <p>{text}</p>

      {byCurrentUser && !deleted &&
        <button onClick={setEditingConversation}>Edit</button>}

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
      return { setEditingConversation: () => dispatch({ type: SET_EDITING_CONVERSATION }) };
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
  scrollToForm: PropTypes.func.isRequired,
  closeConversationCommentList: PropTypes.func.isRequired,
  conversationType: PropTypes.string.isRequired,
};
