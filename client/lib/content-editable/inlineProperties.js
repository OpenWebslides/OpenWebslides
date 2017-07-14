export const inlinePropertyTypes = {
  EMPHASIS: {
    startTag: '<em>',
    endTag: '</em>',
  },
  STRONG: {
    startTag: '<strong>',
    endTag: '</strong>',
  },
};

export function removeOrMergeOverlappingInlineProperties(inlineProperties, newInlineProperty) {
  /* eslint-disable */
  let i = 0;
  const indicesToDelete = [];

  // iterate over all existing inlineProperties and check for conflicts
  // (Note: we can stop as soon as newInlineProperty.endsAtChar is larger than
  // the current inlineProperty.startsAtChar because there can be no overlap anymore
  // since the inlineProperties array is ordered.)
  while (
    i < inlineProperties.length &&
    newInlineProperty.endsAtChar >= inlineProperties[i].startsAtChar
  ) {
    // check for overlap
    // first check the selectionOffset.start
    if (newInlineProperty.startsAtChar >= inlineProperties[i].startsAtChar) {
      // if selection start overlaps this inlineProperty
      if (newInlineProperty.startsAtChar < inlineProperties[i].endsAtChar) {
        // remove this inlineProperty
        indicesToDelete.push(i);
      }
      // if inlineProperties touch each other
      else if (newInlineProperty.startsAtChar === inlineProperties[i].endsAtChar) {
        // if they are the same type, they can be merged into one
        if (newInlineProperty.type === inlineProperties[i].type) {
          // remove this inlineProperty
          indicesToDelete.push(i);
          // and change the selectionOffsets to include this inlineProperty
          newInlineProperty.startsAtChar = inlineProperties[i].startsAtChar;
        }
        // if they are not the same type, they can exist next to each other
      }
    }
    // then check the selectionOffset.end; if selection end overlaps this inlineProperty
    else if (newInlineProperty.endsAtChar > inlineProperties[i].startsAtChar) {
      // remove this inlineProperty
      indicesToDelete.push(i);
    }
    // if selection end touches this inlineProperty
    else if (newInlineProperty.endsAtChar === inlineProperties[i].startsAtChar) {
      // if they are the same type, they can be merged into one
      if (newInlineProperty.type === inlineProperties[i].type) {
        // remove this inlineProperty
        indicesToDelete.push(i);
        // and change the selectionOffsets to include this inlineProperty
        newInlineProperty.endsAtChar = inlineProperties[i].endsAtChar;
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
  if (newInlineProperty.startsAtChar !== newInlineProperty.endsAtChar) {
    // inlineProperties should be sorted by startsAtChar; find correct index
    let i = 0;
    while (i < inlineProperties.length && newInlineProperty.startsAtChar > inlineProperties[i].startsAtChar) {
      i += 1;
    }
    // insert new inlineProperty at the correct index
    inlineProperties.splice(i, 0, newInlineProperty);
  }
}

export function updateInlinePropertiesAfterInputAtIndex(inlineProperties, caretPosition, amount) {
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
      if (inlineProperties[i].startsAtChar >= origPosition) {
        // move both start & end by $amount
        inlineProperties[i].startsAtChar += amount;
        inlineProperties[i].endsAtChar += amount;
      }
      // if the original caret position lies inside the inlineProperty
      else if (inlineProperties[i].endsAtChar >= origPosition) {
        // move only the end by $amount
        inlineProperties[i].endsAtChar += amount;
      }
    }
    // if characters were deleted
    else if (amount < 0) {
      // if the entire inlineProperty lies after the original caret position
      if (inlineProperties[i].startsAtChar >= origPosition) {
        // move both start & end by $amount
        inlineProperties[i].startsAtChar += amount;
        inlineProperties[i].endsAtChar += amount;
      }
      // if the original caret position lies inside the inlineProperty
      else if (inlineProperties[i].endsAtChar > origPosition) {
        // move the end by $amount
        inlineProperties[i].endsAtChar += amount;
        // check if the deleted character string overlapped with start
        if (inlineProperties[i].startsAtChar > caretPosition) {
          // if so, move start to the new caretPosition
          inlineProperties[i].startsAtChar = caretPosition;
        }
        // if it doesn't overlap, that means the entire deleted string was
        // inside this inlineProperty; start does not need to be moved
      }
      // if the new caret position lies inside or before the inlineProperty
      else if (inlineProperties[i].endsAtChar >= caretPosition) {
        // if the entire inlineProperty lies in de deleted character string
        if (inlineProperties[i].startsAtChar >= caretPosition) {
          // delete the inlineProperty
          indicesToDelete.push(i);
        }
        // if the deleted character string only partially overlapped this inlineProperty
        else {
          // move end to the new caretPosition
          inlineProperties[i].endsAtChar = caretPosition;
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

export function getHTMLStringFromInlinePropertiesAndText(inlineProperties, text) {
  /* eslint-disable */

  // #TODO maybe this should be moved to a selector instead? (more efficient)
  let textHTML = '';

  // if there are no inlineproperties, just return the plain text
  if (inlineProperties.length === 0) {
    textHTML = text;
  }
  // if there are inlineProperties, insert their HTML tags into the text
  else {
    // assume inlineproperties are sorted by startsAtChar
    // so we can just look at the next one every time a match is found
    // without having to loop the entire array every iteration
    let inlinePropertyIndex = 0;
    let inlineProperty = null;
    let charIndex = 0;

    // loop over all the chars of text
    while (charIndex < text.length) {
      // if there is a current inlineProperty (meaning: started but not yet ended)
      if (inlineProperty !== null) {
        // check if the current inline property ends at this charIndex
        if (inlineProperty.endsAtChar === charIndex) {
          // if so, add the end tag to the HTML string
          textHTML += inlineProperty.type.endTag;
          // unset the current inline property
          inlineProperty = null;
        }
      }
      // if there is no current inlineProperty (because they can't overlap)
      // and there are unused inline properties left
      if (
        inlineProperty === null &&
        inlinePropertyIndex < inlineProperties.length
      ) {
        // check if the next inlineProperty starts at this charIndex
        if (inlineProperties[inlinePropertyIndex].startsAtChar === charIndex) {
          // if so, save it as the current inlineProperty
          inlineProperty = inlineProperties[inlinePropertyIndex];
          // add its start tag to the HTML string
          textHTML += inlineProperty.type.startTag;
          // update the next inlineProperty index
          inlinePropertyIndex += 1;
        }
      }

      // add the current char to the HTML string
      textHTML += text.charAt(charIndex);

      // move to the next char
      charIndex += 1;
    }
  }

  return textHTML;

  /* eslint-enable */
}
