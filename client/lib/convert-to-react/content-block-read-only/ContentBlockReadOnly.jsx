import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { convertToHTML } from 'draft-convert';

export default class ReadOnlyContentBlock extends Component {
  shouldComponentUpdate(nextProps) {
    const currentContent = this.props.contentBlock.data.getCurrentContent();
    const nextContent = nextProps.contentBlock.data.getCurrentContent();

    if (currentContent === nextContent) {
      return false;
    }
    return true;
  }

  render() {
    const { contentBlock } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: convertToHTML(contentBlock.data.getCurrentContent()),
        }}
      />
    );
  }
}

ReadOnlyContentBlock.propTypes = {
  contentBlock: PropTypes.objectOf(Object).isRequired,
};
