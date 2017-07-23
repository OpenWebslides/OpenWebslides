import React from 'react';

export default function Iframe(props) {
  const { contentItem } = props;
  if (props.editable) {
    return <iframe src={contentItem.src} />;
  }
  return <p>[Iframe Placeholder]</p>;
}
