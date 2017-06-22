import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ViewPane from './ViewPane';

import addTitle from 'actions/contentBlockActions';

class EditingPane extends Component {
  constructor() {
    super();
    this.handleAddTitle = this.handleAddTitle.bind(this);
  }

  handleAddTitle() {
    this.props.addTitle(this.props.activeSlide);
  }

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
};

EditingPane.defaultProps = {
  cssIdentifier: 'default',
};

function mapStateToProps(state) {
  return {
    activeSlide: state.app.editor.activeSlide,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTitle }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingPane);
