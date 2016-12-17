import { OrderedSet } from 'immutable';

const SPACE = ' ';
const MAX_DEPTH = 4;

const getWhitespaceChunk = (inEntity: ?string): Object => {
  const entities = new Array(1);
  if (inEntity) {
    entities[0] = inEntity;
  }
  return {
    text: SPACE,
    inlines: [new OrderedSet()],
    entities,
    blocks: [],
  };
};

const createTextChunk = (node: Object): Object => {
  const text = node.textContent;
  if (text.trim() === '') {
    return { chunk: getWhitespaceChunk() };
  }
  return {
    chunk: {
      text,
      inlines: Array(text.length).fill(new OrderedSet()),
      entities: Array(text.length).fill(null),
      blocks: [],
    },
  };
};

const getSoftNewlineChunk = (): Object => {
  return {
    text: '\n',
    inlines: [new OrderedSet()],
    entities: new Array(1),
    blocks: [],
  };
};

const getEmptyChunk = (): Object => {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: [],
  };
};

const getBlockDividerChunk = (block: Object, depth: number): Object => {
  return {
    text: '\r',
    inlines: [new OrderedSet()],
    entities: new Array(1),
    blocks: [{
      type: block,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth)),
    }],
  };
};

module.exports = {
  createTextChunk,
  getWhitespaceChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
};
