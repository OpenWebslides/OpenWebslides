import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Paragraph(props) {
  if (props.editable) {
    return (
      <p>
        <ContentEditableContainer contentItem={props.contentItem} />
      </p>
    );
  }
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: getHTMLStringFromInlinePropertiesAndText(props.contentItem.inlineProperties, props.contentItem.text),
      }}
    />
  );
}

Paragraph.propTypes = {
  editable: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Paragraph.defaultProps = {
  editable: false,
};
