import { Map } from 'immutable';

export default function getBlockData(
  node: Object
): Object {
  if (node.style.textAlign) {
    return new Map({
      'text-align': node.style.textAlign,
    })
  }
  return undefined;
}
