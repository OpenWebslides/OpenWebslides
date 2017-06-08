export default function includesInlineStyle(el) {
  const inlineTypes = ['EM', 'STRONG'];

  return inlineTypes.includes(el.nodeName);
}
