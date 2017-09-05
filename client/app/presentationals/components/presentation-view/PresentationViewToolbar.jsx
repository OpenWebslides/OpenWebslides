import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PresentationToolbar extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleNavigation.bind(this));
  }

  handleNavigation(e) {
    const { annotationMode } = this.props;

    if (annotationMode) {
      return;
    }

    switch (e.keyCode) {
      case 37:
      case 34:
        e.preventDefault();
        this.props.viewPreviousSlide();
        break;
      case 39:
      case 13:
      case 32:
      case 33:
        e.preventDefault();
        this.props.viewNextSlide();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div id="presentation-toolbar">
        <button onClick={() => this.props.viewFirstSlide()}>First</button>
        <button onClick={() => this.props.viewPreviousSlide()}>Previous</button>
        <button onClick={() => this.props.viewNextSlide()}>Next</button>
        <button onClick={() => this.props.viewLastSlide()}>Last</button>
        <button onClick={() => this.props.history.push('/')}>Dashboard</button>
        <button onClick={() => this.props.toggleAnnotationMode()}>Toggle Annotation Mode</button>
      </div>
    );
  }
}

PresentationToolbar.propTypes = {
  viewFirstSlide: PropTypes.func.isRequired,
  viewPreviousSlide: PropTypes.func.isRequired,
  viewNextSlide: PropTypes.func.isRequired,
  viewLastSlide: PropTypes.func.isRequired,
  toggleAnnotationMode: PropTypes.func.isRequired,
  annotationMode: PropTypes.bool.isRequired,
};


export default withRouter(PresentationToolbar);
