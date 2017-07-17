import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      this.props.addContentBlock(activeContentBlock.id, type);
    }
  }

  handleAddContentBlock(e, contentItemType) {
    e.preventDefault();
    const { contentBlockSequence, activeSlideId } = this.props;

    const contentItemId = `${activeSlideId}-${contentBlockSequence}`;

    this.props.addContentBlock(contentItemId, contentItemType, activeSlideId);
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
      <div className={`c_slide-editor c_slide-editor--${this.props.cssIdentifier}`}>
        <div className="c_slide-editor__wrapper">
          <div className="c_slide-editor__item c_slide-editor__item--toolbar">
            <button onMouseDown={e => this.handleAddContentBlock(e, 'TITLE')}>
              Add Title
            </button>
            <button onMouseDown={e => this.handleAddContentBlock(e, 'PARAGRAPH')}>
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
            <button onMouseDown={e => this.handleToggleInlineStyle(e, 'ITALIC')}>
              Italic
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
  activeSlideId: PropTypes.string,
  addContentBlock: PropTypes.func.isRequired,
  contentBlockSequence: PropTypes.number,
  cssIdentifier: PropTypes.string,
};

SlideEditingPane.defaultProps = {
  activeContentBlock: null,
  activeSlideId: null,
  contentBlockSequence: null,
  cssIdentifier: 'default',
};
