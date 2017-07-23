import React from 'react';

export default function Image(props) {
  const { contentItem } = props;

  return <img src={contentItem.src} alt={contentItem.altText} />;
}
