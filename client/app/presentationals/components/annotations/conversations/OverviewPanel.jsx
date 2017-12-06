import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getConversationsById } from 'selectors/entities/conversations';
import { setActiveSlide } from 'actions/app/presentation-view';

const sortConversationsBySlide = (conversations) => {
  const conversationsPerSlide = {};

  Object.keys(conversations).forEach((key) => {
    const { id, title, createdTimeAgo, commentCount, contentItemId, conversationType } = conversations[key];

    (conversationsPerSlide[contentItemId] = conversationsPerSlide[contentItemId] || []).push({ id, conversationType, title, contentItemId, createdTimeAgo, commentCount });
  });

  return conversationsPerSlide;
};

function OverviewPanel(props) {
  const { closeOverviewPanel, showConversationPanel, conversations, setActiveSlide } = props;

  function renderConversations(conversations) {
    const conversationsBySlide = sortConversationsBySlide(conversations);

    return (
      <ul>
        {Object.keys(conversationsBySlide).map((slideId) => {
          const slideNumber = parseInt(slideId.split('-')[0]) + 1;

          return (
            <li key={slideNumber}>
              <a href="#" onClick={() => setActiveSlide(slideId)}><h4>Slide {slideNumber}</h4></a>
              {conversationsBySlide[slideId].map((conversation) => {
                const { id, title, commentCount, createdTimeAgo, conversationType } = conversation;
                const iconClass = conversationType === 'question' ? 'fa-question' : 'fa-exclamation';
                const visibleTitle = _.truncate(title, { length: 80, separator: '.' });

                return (<div>
                  <p className="soft-color">
                    <a href="#" onClick={() => showConversationPanel(id)}>
                      <i className={`fa annotation-type ${iconClass}`} aria-hidden="true" /> {visibleTitle}
                    </a>
                  </p>
                  <p className="metadata no-margin">
                    {commentCount} comments - {createdTimeAgo}
                  </p>
                </div>);
              })
              }
              <hr className="delimiter" />
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <button className="close-btn fa fa-chevron-left fa-6" onClick={() => closeOverviewPanel()} />
      <h3 className="panel-title"><strong>Annotations Overview</strong></h3>
      <hr className="delimiter" />
      { conversations ? renderConversations(conversations) : <div><p>Hello</p></div>}
    </div>
  );
}

OverviewPanel.propTypes = {
  closeOverviewPanel: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    return { conversations: getConversationsById(state) };
  },
  (dispatch) => {
    return bindActionCreators({ setActiveSlide }, dispatch);
  },
)(OverviewPanel);
