export function removeOrMergeOverlappingInlineProperties(
  inlineProperties,
  newInlineProperty,
) {
  /* eslint-disable */
  let i = 0;
  const indicesToDelete = [];

  // iterate over all existing inlineProperties and check for conflicts
  // (Note: we can stop as soon as newInlineProperty.endsAtChar is larger than
  // the current inlineProperty.startsAtChar because there can be no overlap anymore
  // since the inlineProperties array is ordered.)
  while (
    i < inlineProperties.length &&
    newInlineProperty.offsets.end >= inlineProperties[i].offsets.start
  ) {
    // check for overlap
    // first check the selectionOffset.start
    if (newInlineProperty.offsets.start >= inlineProperties[i].offsets.start) {
      // if selection start overlaps this inlineProperty
      if (newInlineProperty.offsets.start < inlineProperties[i].offsets.end) {
        // remove this inlineProperty
        indicesToDelete.push(i);
      }
      // if inlineProperties touch each other
      else if (newInlineProperty.offsets.start === inlineProperties[i].offsets.end) {
        // if they are the same type, they can be merged into one
        if (newInlineProperty.type === inlineProperties[i].type) {
          // remove this inlineProperty
          indicesToDelete.push(i);
          // and change the selectionOffsets to include this inlineProperty
          newInlineProperty.offsets.start = inlineProperties[i].offsets.start;
        }
        // if they are not the same type, they can exist next to each other
      }
    }
    // then check the selectionOffset.end; if selection end overlaps this inlineProperty
    else if (newInlineProperty.offsets.end > inlineProperties[i].offsets.start) {
      // remove this inlineProperty
      indicesToDelete.push(i);
    }
    // if selection end touches this inlineProperty
    else if (newInlineProperty.offsets.end === inlineProperties[i].offsets.start) {
      // if they are the same type, they can be merged into one
      if (newInlineProperty.type === inlineProperties[i].type) {
        // remove this inlineProperty
        indicesToDelete.push(i);
        // and change the selectionOffsets to include this inlineProperty
        newInlineProperty.offsets.end = inlineProperties[i].offsets.end;
      }
      // if they are not the same type, they can exist next to each other
    }

    i += 1;
  }

  // loop through indicesToDelete (in reverse order) to delete these inlineProperties from the array
  for (i = indicesToDelete.length - 1; i >= 0; i -= 1) {
    inlineProperties.splice(indicesToDelete[i], 1);
  }

  /* eslint-enable */
}

export function addInlinePropertyToArray(inlineProperties, newInlineProperty) {
  // first take care of any overlap
  removeOrMergeOverlappingInlineProperties(inlineProperties, newInlineProperty);

  // only add inline property if any text was selected
  if (newInlineProperty.offsets.start !== newInlineProperty.offsets.end) {
    // inlineProperties should be sorted by startsAtChar; find correct index
    let i = 0;
    while (
      i < inlineProperties.length &&
      newInlineProperty.offsets.start > inlineProperties[i].offsets.start
    ) {
      i += 1;
    }
    // insert new inlineProperty at the correct index
    inlineProperties.splice(i, 0, newInlineProperty);
  }
}

export function updateInlinePropertiesAfterInputAtIndex(
  inlineProperties,
  caretPosition,
  amount,
) {
  /* eslint-disable */

  let i;
  const indicesToDelete = [];
  // the caret position before characters were added / deleted
  let origPosition = caretPosition - amount;

  // loop over all inlineProperties
  for (i = 0; i < inlineProperties.length; i += 1) {
    // if characters were added
    if (amount > 0) {
      // if the entire inlineProperty lies after the original caret position
      if (inlineProperties[i].offsets.start >= origPosition) {
        // move both start & end by $amount
        inlineProperties[i].offsets.start += amount;
        inlineProperties[i].offsets.end += amount;
      }
      // if the original caret position lies inside the inlineProperty
      else if (inlineProperties[i].offsets.end >= origPosition) {
        // move only the end by $amount
        inlineProperties[i].offsets.end += amount;
      }
    }
    // if characters were deleted
    else if (amount < 0) {
      // if the entire inlineProperty lies after the original caret position
      if (inlineProperties[i].offsets.start >= origPosition) {
        // move both start & end by $amount
        inlineProperties[i].offsets.start += amount;
        inlineProperties[i].offsets.end += amount;
      }
      // if the original caret position lies inside the inlineProperty
      else if (inlineProperties[i].offsets.end > origPosition) {
        // move the end by $amount
        inlineProperties[i].offsets.end += amount;
        // check if the deleted character string overlapped with start
        if (inlineProperties[i].offsets.start > caretPosition) {
          // if so, move start to the new caretPosition
          inlineProperties[i].offsets.start = caretPosition;
        }
        // if it doesn't overlap, that means the entire deleted string was
        // inside this inlineProperty; start does not need to be moved
      }
      // if the new caret position lies inside or before the inlineProperty
      else if (inlineProperties[i].offsets.end >= caretPosition) {
        // if the entire inlineProperty lies in de deleted character string
        if (inlineProperties[i].offsets.start >= caretPosition) {
          // delete the inlineProperty
          indicesToDelete.push(i);
        }
        // if the deleted character string only partially overlapped this inlineProperty
        else {
          // move end to the new caretPosition
          inlineProperties[i].offsets.end = caretPosition;
        }
      }
    }
  }

  // loop through indicesToDelete (in reverse order) to delete these inlineProperties from the array
  for (i = indicesToDelete.length - 1; i >= 0; i -= 1) {
    inlineProperties.splice(indicesToDelete[i], 1);
  }

  /* eslint-enable */
}
