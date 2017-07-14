import React from 'react';
import PropTypes from 'prop-types';

import { getHTMLStringFromInlinePropertiesAndText } from 'lib/content-editable/inlineProperties';

import ContentEditableContainer from 'lib/content-editable/ContentEditableContainer';

export default function Paragraph(props) {
  if (props.active) {
    return (
      <p>
        <ContentEditableContainer {...props} />
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
  active: PropTypes.bool,
  contentItem: PropTypes.objectOf(Object).isRequired,
};

Paragraph.defaultProps = {
  active: false,
};
