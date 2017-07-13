// based on: https://stackoverflow.com/a/13950376

export function getSelectionOffsets(containerElement) {
  // if no offsets can be found, default to 0
  let offsets = {
    start: 0,
    end: 0,
  };

  // get the current selection
  const selection = window.getSelection();

  // we need this check to work around a webkit issue where rangecount would sometimes be 0
  if (selection && selection.rangeCount > 0) {
    // get the current selected range
    const selectedRange = window.getSelection().getRangeAt(0);
    // make a clone of the selected range that can be safely manipulated
    const clonedRange = selectedRange.cloneRange();
    // set the cloned range to span the entire container
    clonedRange.selectNodeContents(containerElement);
    // set the end of the cloned range to the start of the selected range
    clonedRange.setEnd(selectedRange.startContainer, selectedRange.startOffset);

    // clonedRange now runs from the start of the container until the start of the selected range
    // the length of its string contents is the start offset of the selected range
    const selectionStartOffset = clonedRange.toString().length;
    // the end offset can be calculated by adding the length of the selected range to the start offset
    const selectionEndOffset =
      selectionStartOffset + selectedRange.toString().length;

    // verify that the offsets fall inside the container
    if (selectionEndOffset <= containerElement.textContent.length) {
      // if offsets are valid, return them
      offsets = {
        start: selectionStartOffset,
        end: selectionEndOffset,
      };
    }
  }

  return offsets;
}

export function setSelectionByOffsets(
  containerElement,
  startOffset,
  endOffset,
) {
  /* eslint-disable */

  // validate parameters
  if (startOffset < 0 || endOffset < startOffset) {
    console.error('Invalid offsets.');
    return;
  }
  if (
    startOffset > containerElement.textContent.length ||
    endOffset > containerElement.textContent.length
  ) {
    console.error('Offsets out of range.');
    return;
  }

  let nodeStartOffset = 0, nextNodeStartOffset = 0, i;
  let foundStart = false, foundEnd = false;
  const nodeStack = [containerElement];
  let node;

  // variable to contain the selected range
  const range = document.createRange();
  range.setStart(containerElement, 0);
  range.collapse(true);

  // variable to contain the selection
  const sel = window.getSelection();

  // loop through the DOM tree starting at this.contentEditable
  // until the end of the selection is found
  while (!foundEnd && nodeStack.length > 0) {
    node = nodeStack.pop();

    // if the current node is not a text node
    if (node.nodeType !== Node.TEXT_NODE) {
      // add its children to the stack
      i = node.childNodes.length - 1;
      while (i >= 0) {
        nodeStack.push(node.childNodes[i]);
        i -= 1;
      }
    }
    // if the current node is a text node
    else {
      nextNodeStartOffset = nodeStartOffset + node.length;

      // if the selection start node hasn't been found yet
      // check if this is the node containing the selection start
      if (!foundStart && startOffset >= nodeStartOffset && startOffset <= nextNodeStartOffset) {
        // if so, set the start of the range
        range.setStart(node, startOffset - nodeStartOffset);
        foundStart = true;
      }
      // if the selection start has been found, search for the end
      // check if this is the node containing the selection end
      if (foundStart && endOffset >= nodeStartOffset && endOffset <= nextNodeStartOffset) {
        // if so, set the end of the range
        range.setEnd(node, endOffset - nodeStartOffset);
        foundEnd = true;
      }

      nodeStartOffset = nextNodeStartOffset;
    }
  }

  // remove are current selections
  sel.removeAllRanges();
  // set a selection at the given offsets
  sel.addRange(range);

  /* eslint-enable */
}