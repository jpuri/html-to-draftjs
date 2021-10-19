import { Map } from 'immutable';

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
    wrapper: 'ul',
  },
  'ordered-list-item': {
    element: 'li',
    wrapper: 'ol',
  },
  blockquote: {
    element: 'blockquote',
  },
  code: {
    element: 'pre',
  },
  atomic: {
    element: 'figure',
  },
  unstyled: {
    element: 'p',
    aliasedElements: [
      'div',
      'span',
    ]
  },
});

export default function getBlockTypeForTag(
  tag: string,
  lastList: ?string
): Object {
  const matchedTypes = blockRenderMap
    .filter(draftBlock => {
      return (
      (draftBlock.element === tag &&
      (!draftBlock.wrapper || draftBlock.wrapper === lastList)) ||
      draftBlock.wrapper === tag ||
      (draftBlock.aliasedElements && draftBlock.aliasedElements.indexOf(tag) > -1)
    )})
    .keySeq()
    .toSet()
    .toArray();

  if (matchedTypes.length === 1) {
    return matchedTypes[0];
  }
  return undefined;
}
