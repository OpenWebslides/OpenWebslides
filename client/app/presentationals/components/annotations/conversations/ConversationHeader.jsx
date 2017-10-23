import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setIsEditingConversation, unsetIsEditingConversation } from 'actions/app/annotations';
import { getIsEditingConversation } from 'selectors/app/annotations';

import { updateConversation } from 'actions/entities/conversations';
import ConversationForm from './ConversationForm';

function ConversationHeader(props) {
  const {
    isEditingConversation,
    user,
    title,
    text,
    byCurrentUser,
    deleted,
    scrollToForm,
    conversationType,
  } = props;

  if (isEditingConversation) {
    return (
      <ConversationForm
        initialValues={{ title, text, conversationType }}
        submitText="Save"
        cancelAction={props.unsetIsEditingConversation}
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
    <div className="soft-color">
      <p><strong>{user.firstName} {user.lastName}</strong> wrote:</p>

      <h3 className="no-margin">{title}</h3>
      <p className="margin-b15">{text}</p>

      {byCurrentUser && !deleted &&
        <button className="like-btn" onClick={props.setIsEditingConversation}>
          <i className="fa fa-pencil fa-6" aria-hidden="true" />
        </button>}

      { deleted &&
        <p> Adding comments is disabled for deleted conversations.</p>
        }
      <hr className="delimiter" />

    </div>
  );
}

export default compose(
  connect(
    (state) => {
      return { isEditingConversation: getIsEditingConversation(state) };
    },
    (dispatch) => {
      return bindActionCreators({ setIsEditingConversation, unsetIsEditingConversation }, dispatch);
    },
  ),
)(ConversationHeader);

ConversationHeader.propTypes = {
  isEditingConversation: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  byCurrentUser: PropTypes.bool.isRequired,
  deleted: PropTypes.bool.isRequired,
  setIsEditingConversation: PropTypes.func.isRequired,
  unsetIsEditingConversation: PropTypes.func.isRequired,
  scrollToForm: PropTypes.func.isRequired,
  closeConversationCommentList: PropTypes.func.isRequired,
  conversationType: PropTypes.string.isRequired,
};
