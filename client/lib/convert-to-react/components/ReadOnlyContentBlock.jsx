import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'draft-js';

export default function ReadOnlyContentBlock(props) {
  const { contentBlock } = props;
  return <Editor readOnly editorState={contentBlock.data} />;
}

ReadOnlyContentBlock.propTypes = {
  contentBlock: PropTypes.objectOf(Object).isRequired,
};
