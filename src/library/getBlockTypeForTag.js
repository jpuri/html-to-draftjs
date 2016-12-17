function getListBlockType(
  tag: string,
  lastList: ?string
): ?Object {
  if (tag === 'li') {
    return lastList === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
  }
  return null;
}

function getMultiMatchedType(
  tag: string,
  lastList: ?string,
  multiMatchExtractor: Array<Function>
): ?Object {
  for (let ii = 0; ii < multiMatchExtractor.length; ii += 1) {
    const matchType = multiMatchExtractor[ii](tag, lastList);
    if (matchType) {
      return matchType;
    }
  }
  return null;
}

export default function getBlockTypeForTag(
  tag: string,
  lastList: ?string,
  blockRenderMap: Object
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

  // if we dont have any matched type, return unstyled
  // if we have one matched type return it
  // if we have multi matched types use the multi-match function to gather type
  switch (matchedTypes.length) {
    case 0:
      return 'unstyled';
    case 1:
      return matchedTypes[0];
    default:
      return (
        getMultiMatchedType(tag, lastList, [getListBlockType]) ||
        'unstyled'
      );
  }
}
