export default function getFilteredTextContent(contentEditable) {
  const text = contentEditable.textContent;
  // strip newlines
  return text.replace(/\n/g, ' ');
}
