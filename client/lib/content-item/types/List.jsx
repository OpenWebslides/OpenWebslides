import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;
  const ListType = contentItem.ordered ? 'ol' : 'ul';

  return (
    <ListType>
      {contentItem.childItemIds.map(id => {
        return <ContentItemContainer
          key={id}
          contentItemId={id}
          parentItemId={props.contentItem.id}
          slideId={props.slideId}
          editable={props.editable}
          headingLevel={props.headingLevel}
        />
      })}
    </ListType>
  );
}
