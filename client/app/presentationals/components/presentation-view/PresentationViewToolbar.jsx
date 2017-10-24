import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getConversationCountForActiveSlide } from 'selectors/entities/conversations';
import { getSlideCountById } from 'selectors/entities/decks';
import { getNumberOfActiveSlideInPresentation } from 'selectors/app/presentation';

class PresentationToolbar extends Component {

  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);
    // this.renderSlideNumbers = this.renderSlideNumbers.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleNavigation);
  }

  componentWillUpdate(nextProps) {
    const { annotationMode } = nextProps;

    if (!annotationMode) {
      window.addEventListener('keydown', this.handleNavigation);
    }
    else {
      window.removeEventListener('keydown', this.handleNavigation);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleNavigation);
  }

  handleNavigation(e) {
    switch (e.keyCode) {
      case 37:
      case 34:
        e.preventDefault();
        this.props.viewPreviousSlide();
        break;
      case 39:
      case 13:
      case 33:
        e.preventDefault();
        this.props.viewNextSlide();
        break;
      default:
        break;
    }
  }

  render() {
    const { deckId, conversationCount, deckLength, slideNumber } = this.props;
    const conversationCountIconClass = conversationCount ? 'fa-comment' : 'fa-comment-o';

    return (
      <div className="c_presentation-view-toolbar">
        <div className="c_presentation-view-toolbar__wrapper">
          <menu className="c_presentation-view-toolbar__list">
            <li className="c_presentation-view-toolbar__item">
              {slideNumber} / {deckLength}
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewFirstSlide()}
              >
                <i className={'fa fa-angle-double-left'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewPreviousSlide()}
              >
                <i className={'fa fa-angle-left'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewNextSlide()}
              >
                <i className={'fa fa-angle-right'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewLastSlide()}
              >
                <i className={'fa fa-angle-double-right'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.history.push('/')}
              >
                <i className={'fa fa-home'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.history.push(`/print/${deckId}`)}
              >
                <i className={'fa fa-book'} aria-hidden="true" />
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.toggleAnnotationMode()}
              >
                <i className={`fa ${conversationCountIconClass}`} aria-hidden="true" />
              </button>
              {`${conversationCount}`}
            </li>
          </menu>
        </div>
      </div>
    );
  }
}

PresentationToolbar.propTypes = {
  viewFirstSlide: PropTypes.func.isRequired,
  deckId: PropTypes.string.isRequired,
  viewPreviousSlide: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
  viewNextSlide: PropTypes.func.isRequired,
  viewLastSlide: PropTypes.func.isRequired,
  toggleAnnotationMode: PropTypes.func.isRequired,
  annotationMode: PropTypes.bool.isRequired,
  conversationCount: PropTypes.number.isRequired,
  deckLength: PropTypes.number.isRequired,
  slideNumber: PropTypes.number.isRequired,
};

export default compose(
  withRouter,
  connect(
    (state, props) => {
      return {
        conversationCount: getConversationCountForActiveSlide(state),
        deckLength: getSlideCountById(state, props.deckId),
        slideNumber: getNumberOfActiveSlideInPresentation(state, props.deckId),
      };
    },
  ),
)(PresentationToolbar);
