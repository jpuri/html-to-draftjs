const blockRenderMap = new Map({
  'header-one': {
    element: 'h1',
  },
  'header-two': {
    element: 'h2',
  },
  'header-three': {
    element: 'h3',
  },
  'header-four': {
    element: 'h4',
  },
  'header-five': {
    element: 'h5',
  },
  'header-six': {
    element: 'h6',
  },
  'unordered-list-item': {
    element: 'li',
  },
  'ordered-list-item': {
    element: 'li',
  },
  blockquote: {
    element: 'blockquote',
  },
  atomic: {
    element: 'figure',
  },
  unstyled: {
    element: 'div',
  },
});

export default function getBlockTypeForTag(
  tag: string,
  lastList: ?string
): Object {
  const matchedTypes = blockRenderMap
    .filter(draftBlock => (
      draftBlock.element === tag ||
      draftBlock.wrapper === tag ||
      (
        draftBlock.aliasedElements &&
        draftBlock.aliasedElements.some(alias => alias === tag)
      )
    ))
    .keySeq()
    .toSet()
    .toArray()
    .sort();

  if (matchedTypes.length === 1) {
    return matchedTypes[0];
  }
  return undefined;
}
