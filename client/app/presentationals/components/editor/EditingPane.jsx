import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ViewPane from './ViewPane';

import addTitle from 'actions/contentBlockActions';

class EditingPane extends Component {
  componentDidMount() {
    this.activeSlide = 'hm?';
  }

  shouldComponentUpdate(nextProps) {
    if (this.selectedSlideId === nextProps.activeDeck.slides.selectedSlide) {
      return false;
    }
    return true;
  }

  addTitle() {}

  render() {
    //   return (
    //     <div
    //       className={`c_slide-editor c_slide-editor--${this.props
    //         .cssIdentifier}`}
    //     >
    //       <div className="c_slide-editor__wrapper">
    //         {/* <div className="c_slide-editor__item c_slide-editor__item--toolbar">
    //       <p>[Toolbar goes here]</p>
    //     </div> */}
    //         <div className="c_slide-editor__item c_slide-editor__item--views-panel">
    //           <ViewPane activeSlide={activeSlide} />
    //         </div>
    //         {/* #TODO
    //     <div className="c_slide-editor__item c_slide-editor__item--slide-health">
    //       <p>[Slide health goes here]</p>
    //     </div> */}
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div
        className={`c_slide-editor c_slide-editor--${this.props.cssIdentifier}`}
      >
        <div className="c_slide-editor__wrapper">
          <div className="c_slide-editor__item c_slide-editor__item--toolbar">
            <button onMouseDown={this.addTitle}>Add Title</button>
          </div>
          <div className="c_slide-editor__item c_slide-editor__item--views-panel">
            <ViewPane />
          </div>
          {/* #TODO
        <div className="c_slide-editor__item c_slide-editor__item--slide-health">
          <p>[Slide health goes here]</p>
        </div> */}
        </div>
      </div>
    );
  }
}

EditingPane.propTypes = {
  cssIdentifier: PropTypes.string,
  activeDeck: PropTypes.objectOf(Object).isRequired,
};

EditingPane.defaultProps = {
  cssIdentifier: 'default',
};

function mapStateToProps(state) {
  return {
    activeDeck: state.entities.decks,
  };
}

export default connect(mapStateToProps)(EditingPane);
