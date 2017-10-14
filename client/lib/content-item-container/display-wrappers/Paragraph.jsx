import React from 'react';
import PropTypes from 'prop-types';

import { paragraphContentItemShape } from 'constants/propTypeShapes';

import ContentItemInnerContents from '../content-item-contents/ContentItemInnerContents';

function Paragraph(props) {
  const { contentItem, attributes, ...passThroughProps } = props;

  return (
    <p
      className="ows_paragraph"
      {...attributes}
    >
      <ContentItemInnerContents
        contentItem={contentItem}
        {...passThroughProps}
        textPropOptions={[{
          textPropTitle: '',
          textPropName: 'text',
          hasInlineProperties: true,
          deleteOnBackspace: true,
        }]}
      />
    </p>
  );
}

Paragraph.propTypes = {
  contentItem: PropTypes.shape(paragraphContentItemShape).isRequired,
  attributes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Paragraph;
