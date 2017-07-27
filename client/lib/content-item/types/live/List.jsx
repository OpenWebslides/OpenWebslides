import React from 'react';

import ContentItemContainer from 'lib/content-item/ContentItemContainer';

export default function List(props) {
  const { contentItem } = props;
  const ListType = contentItem.ordered ? 'ol' : 'ul';

  return (
    <ListType {...props.attributes}>
      {contentItem.childItemIds.map((id) => {
        return (<ContentItemContainer
          key={id}
          slideViewType={props.slideViewType}
          contentItemId={id}
          ancestorItemIds={props.ancestorItemIds.concat(props.contentItem.id)}
          slideId={props.slideId}
          editable={props.editable}
          headingLevel={props.headingLevel}
        />);
      })}
    </ListType>
  );
}
