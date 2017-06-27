import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ViewsPane from './ViewsPane';
import { RichUtils } from 'draft-js';
import { updateSlide } from 'actions/slideActions';

import { addTitle } from 'actions/contentBlockActions';

class EditingPane extends Component {
  constructor() {
    super();
    this.handleToggleBold = this.handleToggleBold.bind(this);
    this.handleAddTitle = this.handleAddTitle.bind(this);
  }

  handleToggleBold(e) {
    e.preventDefault();
    const newState = RichUtils.toggleInlineStyle(
      this.props.activeContentBlock.data,
      'BOLD',
    );

    this.props.updateSlide(this.props.activeContentBlock.id, newState);
  }

  handleAddTitle(e) {
    e.preventDefault();
    const { contentBlockSequence, activeSlide } = this.props;

    this.props.addTitle(activeSlide, contentBlockSequence);
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
            <button onMouseDown={this.handleAddTitle}>Add Title</button>
            <button onMouseDown={this.handleToggleBold}>Set Bold</button>

          </div>
          <div className="c_slide-editor__item c_slide-editor__item--views-panel">
            <ViewsPane />
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
  const activeContentBlock = state.app.editor.contentBlocks.active;
  return {
    activeSlide: state.app.editor.slides.active,
    activeContentBlock: state.entities.contentBlocks.byId[activeContentBlock],
    contentBlockSequence: state.app.editor.contentBlocks.sequence,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTitle, updateSlide }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditingPane);
