import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Section(props) {
  const { contentItem } = props;

  return (
    <section>
      {contentItem.childItemIds.map(id => (
        <ContentItemContainer
          key={id}
          contentItemId={id}
          parentItemId={props.contentItem.id}
          slideId={props.slideId}
          editable={props.editable}
          headingLevel={props.headingLevel + 1}
        />
      ))}
    </section>
  );
}
