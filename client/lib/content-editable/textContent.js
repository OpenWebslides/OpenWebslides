export default function getFilteredTextContent(contentEditable) {
  const text = contentEditable.textContent;
  // strip newlines
  const filteredText = text.replace(/\n/g, ' ');
  return filteredText;
}
