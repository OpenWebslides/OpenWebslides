export default function parseNodeAttributeContent(
  node,
  attributeName,
  errorMessage = null,
  trim = true,
) {
  let attributeContent = node[attributeName];
  const trimmedAttributeContent = attributeContent.replace(/\s+/g, ' ').trim();

  if (trim === true) {
    attributeContent = trimmedAttributeContent;
  }

  if (trimmedAttributeContent === '' && errorMessage !== false) {
    attributeContent = (errorMessage !== null)
      ? errorMessage
      : `[No ${attributeName} found]`;
  }

  return attributeContent;
}
