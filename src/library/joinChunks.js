const SPACE = ' ';

export default function joinChunks(A: Object, B: Object): Object {
  const lastInA = A.text.slice(-1);
  const firstInB = B.text.slice(0, 1);

  if (
    lastInA === '\r' &&
    firstInB === '\r'
  ) {
    A.text = A.text.slice(0, -1);
    A.inlines.pop();
    A.entities.pop();
    A.blocks.pop();
  }

  if (
    lastInA === '\r'
  ) {
    if (B.text === SPACE || B.text === '\n') {
      return A;
    } else if (firstInB === SPACE || firstInB === '\n') {
      B.text = B.text.slice(1);
      B.inlines.shift();
      B.entities.shift();
    }
  }

  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks),
  };
}
