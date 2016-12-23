import { OrderedSet } from 'immutable';

const SPACE = ' ';
const MAX_DEPTH = 4;

const getWhitespaceChunk = (entityId: ?string): Object => {
  return {
    text: SPACE,
    inlines: [new OrderedSet()],
    entities: [entityId],
    blocks: [],
  };
};

const createTextChunk = (node: Object, inlineStyle: OrderedSet, entityId: number): Object => {
  const text = node.textContent;
  if (text.trim() === '') {
    return { chunk: getWhitespaceChunk(entityId) };
  }
  return {
    chunk: {
      text,
      inlines: Array(text.length).fill(inlineStyle),
      entities: Array(text.length).fill(entityId),
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

const getFirstBlockChunk = (blockType: string, data: Object): Object => {
  return {
    text: '',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: 0,
      data,
    }],
  };
};

const getBlockDividerChunk = (blockType: string, depth: number, data: Object): Object => {
  return {
    text: '\r',
    inlines: [],
    entities: [],
    blocks: [{
      type: blockType,
      depth: Math.max(0, Math.min(MAX_DEPTH, depth)),
      data,
    }],
  };
};

const joinChunks = (A: Object, B: Object): Object => {
  return {
    text: A.text + B.text,
    inlines: A.inlines.concat(B.inlines),
    entities: A.entities.concat(B.entities),
    blocks: A.blocks.concat(B.blocks),
  };
}

module.exports = {
  createTextChunk,
  getWhitespaceChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
  getFirstBlockChunk,
  joinChunks,
};
