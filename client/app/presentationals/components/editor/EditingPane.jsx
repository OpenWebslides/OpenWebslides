import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';

import ViewsPane from './ViewsPane';

export default class EditingPane extends Component {
  constructor() {
    super();
    this.handleToggleInlineStyle = this.handleToggleInlineStyle.bind(this);
    this.handleAddTitle = this.handleAddTitle.bind(this);
  }

  handleToggleInlineStyle(e, type) {
    e.preventDefault();

    const { activeContentBlock } = this.props;

    if (activeContentBlock) {
      const newState = RichUtils.toggleInlineStyle(
        activeContentBlock.data,
        type,
      );

      this.props.updateSlide(activeContentBlock.id, newState);
    }
  }

  handleAddTitle(e) {
    e.preventDefault();
    const { contentBlockSequence, activeSlideId } = this.props;

    this.props.addTitle(activeSlideId, contentBlockSequence);
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
    //           <ViewPane activeSlideId={activeSlideId} />
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
            <button onMouseDown={e => this.handleToggleInlineStyle(e, 'BOLD')}>
              Bold
            </button>
            <button
              onMouseDown={e => this.handleToggleInlineStyle(e, 'ITALIC')}
            >
              Italic
            </button>
            <button
              onMouseDown={e => this.handleToggleInlineStyle(e, 'UNDERLINE')}
            >
              Underline
            </button>

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
  activeContentBlock: PropTypes.objectOf(Object),
  activeSlideId: PropTypes.number,
  addTitle: PropTypes.func.isRequired,
  contentBlockSequence: PropTypes.number,
  cssIdentifier: PropTypes.string,
  updateSlide: PropTypes.func.isRequired,
};

EditingPane.defaultProps = {
  activeContentBlock: null,
  activeSlideId: null,
  contentBlockSequence: null,
  cssIdentifier: 'default',
};
