import { Map } from 'immutable';

type CustomChunkDataGetter = (node: HTMLElement) => ?{ [key: string]: any };

export default function getBlockData(
  node: Object,
  customChunkDataGetter: ?CustomChunkDataGetter
): Object {
  const customData = customChunkDataGetter ?
    customChunkDataGetter(node) :
    {}

  if (node.style.textAlign) {
    return new Map({
      ...customData,
      'text-align': node.style.textAlign,
    })
  } else if (node.style.marginLeft) {
    return new Map({
      ...customData,
      'margin-left': node.style.marginLeft,
    })
  }
  return new Map({ ...customData });
}
