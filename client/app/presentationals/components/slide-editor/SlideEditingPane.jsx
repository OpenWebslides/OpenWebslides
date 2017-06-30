import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';

import SlideViewsPane from './SlideViewsPane';

export default class SlideEditingPane extends Component {
  constructor() {
    super();
    this.handleToggleInlineStyle = this.handleToggleInlineStyle.bind(this);
    this.handleAddContentBlock = this.handleAddContentBlock.bind(this);
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

  handleAddContentBlock(e, type) {
    e.preventDefault();
    const { contentBlockSequence, activeSlideId } = this.props;

    this.props.addContentBlock(activeSlideId, contentBlockSequence, type);
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
            <button onMouseDown={e => this.handleAddContentBlock(e, 'H1')}>
              Add Title
            </button>
            <button onMouseDown={e => this.handleAddContentBlock(e, 'P')}>
              Add Text
            </button>
            <button onMouseDown={e => this.handleAddContentBlock(e, 'UL')}>
              Add UL
            </button>
            <button onMouseDown={e => this.handleAddContentBlock(e, 'OL')}>
              Add OL
            </button>
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
            <SlideViewsPane />
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

SlideEditingPane.propTypes = {
  activeContentBlock: PropTypes.objectOf(Object),
  activeSlideId: PropTypes.number,
  addContentBlock: PropTypes.func.isRequired,
  contentBlockSequence: PropTypes.number,
  cssIdentifier: PropTypes.string,
  updateSlide: PropTypes.func.isRequired,
};

SlideEditingPane.defaultProps = {
  activeContentBlock: null,
  activeSlideId: null,
  contentBlockSequence: null,
  cssIdentifier: 'default',
};
