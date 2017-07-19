// Generators for Slide & ContentItem ids.

export function generateSlideId(deckId, slideSequence) {
  return `${deckId}-${slideSequence}`;
}

export function generateContentItemId(slideId, contentItemSequence) {
  return `${slideId}-${contentItemSequence}`;
}
