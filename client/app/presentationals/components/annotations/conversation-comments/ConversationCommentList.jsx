import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getConversationComments } from 'selectors/entities/conversation-comments';
import { getEditableConversationCommentId } from 'selectors/app/annotations';
import { fetchConversationComments, updateConversationComment } from
  'actions/entities/conversation-comments';
import { unsetEditableConversationComment } from 'actions/app/annotations';
import ConversationCommentMetaData from './ConversationCommentMetaData';
import ConversationCommentForm from './ConversationCommentForm';
import ConversationCommentContent from './ConversationCommentContent';


function ConversationCommentList(props) {
  const { conversationComments, activeConversationId, editableConversationCommentId } = props;

  if (conversationComments) {
    return (
      <div>
        <ul className="list-style-none">
          {
            Object.keys(conversationComments)
              .filter((commentId) => { // Only display comments for this conversation
                return conversationComments[commentId].conversationId === activeConversationId;
              })
              .map((commentId) => {
                if (editableConversationCommentId === commentId) {
                  return (
                    <ConversationCommentMetaData
                      {...conversationComments[commentId]}
                      activeConversationId={activeConversationId}
                      editing={true}
                    >
                      <ConversationCommentForm
                        key={commentId}
                        cols={30}
                        rows={3}
                        autoFocus={true}
                        cancelAction={props.unsetEditableConversationComment}
                        form={`ConversationCommentForm${commentId}`}
                        initialValues={{ text: conversationComments[commentId].text }}
                        submitText="Save"
                        onSubmit={(values, dispatch) => {
                          return new Promise((resolve, reject) => {
                            dispatch(updateConversationComment({ values, resolve, reject }));
                          });
                        }}
                      />
                    </ConversationCommentMetaData>
                  );
                }

                return (
                  <ConversationCommentMetaData {...conversationComments[commentId]}activeConversationId={activeConversationId} >
                    <ConversationCommentContent text={conversationComments[commentId].text} deleted={conversationComments[commentId].deleted} />
                  </ConversationCommentMetaData>
                );
              })
          }
        </ul>
      </div>
    );
  }

  return <h4>No comments have been added yet... Be the first one!</h4>;
}

export default compose(
  connect(
    (state) => {
      return {
        conversationComments: getConversationComments(state),
        editableConversationCommentId: getEditableConversationCommentId(state),
      };
    },
    (dispatch) => {
      return bindActionCreators({
        fetchConversationComments,
        unsetEditableConversationComment }, dispatch);
    },
  ),
  lifecycle({
    componentDidMount() {
      const { activeConversationId } = this.props;
      this.props.fetchConversationComments(activeConversationId);
    },
  }),
)(ConversationCommentList);

ConversationCommentList.propTypes = {
  conversationComments: PropTypes.objectOf(Object),
  activeConversationId: PropTypes.string.isRequired,
  editableConversationCommentId: PropTypes.string,
};

ConversationCommentList.defaultProps = {
  conversationComments: null,
  editableConversationCommentId: null,
};
