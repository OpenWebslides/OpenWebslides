import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PresentationToolbar extends Component {

  constructor() {
    super();
    this.handleNavigation = this.handleNavigation.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleNavigation);
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps);

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
    const { deckId } = this.props;

    return (
      <div className="c_presentation-view-toolbar">
        <div className="c_presentation-view-toolbar__wrapper">
          <menu className="c_presentation-view-toolbar__list">
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewFirstSlide()}
              >
                First
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewPreviousSlide()}
              >
                Previous
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewNextSlide()}
              >
                Next
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.viewLastSlide()}
              >
                Last
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.history.push('/')}
              >
                Dashboard
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.history.push(`/print/${deckId}`)}
              >
                Course Mode
              </button>
            </li>
            <li className="c_presentation-view-toolbar__item">
              <button
                className="c_presentation-view-toolbar__button"
                onClick={() => this.props.toggleAnnotationMode()}
              >
                Toggle Annotation Mode
              </button>
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
};


export default withRouter(PresentationToolbar);
