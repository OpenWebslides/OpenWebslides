import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PresentationToolbar extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleNavigation.bind(this));
    this.toggleAnnotationMode = this.toggleAnnotationMode.bind(this);
  }

  toggleAnnotationMode() {
    const { annotationMode } = this.props;
    if (annotationMode) {
      this.props.closeAnnotationMode();
    }
    else {
      this.props.openAnnotationMode();
    }
  }

  handleNavigation(e) {
    switch (e.keyCode) {
      case 37:
        this.props.viewPreviousSlide();
        break;
      case 39:
      case 13:
      case 32:
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
        <button onClick={() => this.toggleAnnotationMode()}>Toggle Annotation Mode</button>
      </div>
    );
  }
}

PresentationToolbar.propTypes = {
  viewFirstSlide: PropTypes.func.isRequired,
  viewPreviousSlide: PropTypes.func.isRequired,
  viewNextSlide: PropTypes.func.isRequired,
  viewLastSlide: PropTypes.func.isRequired,
};


export default PresentationToolbar;
