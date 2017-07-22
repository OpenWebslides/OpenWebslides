import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function Aside(props) {
  const { contentItem } = props;

  return (
    <aside>
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
    </aside>
  );
}
