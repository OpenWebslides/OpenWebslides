import React from 'react';

export default function Iframe(props) {
  const { contentItem } = props;
  if (props.editable) {
    return (<iframe
      {...props.attributes}
      src={contentItem.src}
    />);
  }
  return <p {...props.attributes}>[Iframe Placeholder]</p>;
}
