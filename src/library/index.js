/* @flow */

import { CharacterMetadata, ContentBlock, genKey, Entity } from 'draft-js';
import { List, OrderedMap, OrderedSet } from 'immutable';
import getSafeBodyFromHTML from './getSafeBodyFromHTML';
import {
  createTextChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
  getFirstBlockChunk,
  getAtomicBlockChunk,
  joinChunks,
} from './chunkBuilder';
import getBlockTypeForTag from './getBlockTypeForTag';
import processInlineTag from './processInlineTag';
import getBlockData from './getBlockData';
import getEntityId from './getEntityId';

const SPACE = ' ';
const REGEX_NBSP = new RegExp('&nbsp;', 'g');

let firstBlock = true;

function genFragment(
  node: Object,
  inlineStyle: OrderedSet,
  depth: number,
  lastList: string,
  inEntity: number
): Object {
  const nodeName = node.nodeName.toLowerCase();

  if (nodeName === '#text' && node.textContent !== '\n') {
    return createTextChunk(node, inlineStyle, inEntity);
  }

  if (nodeName === 'br') {
    return { chunk: getSoftNewlineChunk() };
  }

  if (
    nodeName === 'img' &&
    node instanceof HTMLImageElement
  ) {
    const entityConfig = {};
    entityConfig.src = node.src;
    entityConfig.height = node.style.height;
    entityConfig.width = node.style.width;
    const entityId = Entity.create(
      'IMAGE',
      'MUTABLE',
      entityConfig,
    );
    return { chunk: getAtomicBlockChunk(entityId) };
  }

  if (
    nodeName === 'iframe' &&
    node instanceof HTMLIFrameElement
  ) {
    const entityConfig = {};
    entityConfig.src = node.src;
    entityConfig.height = node.height;
    entityConfig.width = node.width;
    console.log('entityConfig', entityConfig)
    const entityId = Entity.create(
      'EMBEDDED_LINK',
      'MUTABLE',
      entityConfig,
    );
    return { chunk: getAtomicBlockChunk(entityId) };
  }

  const blockType = getBlockTypeForTag(nodeName, lastList);

  let chunk;
  if (blockType) {
    if (nodeName === 'ul' || nodeName === 'ol') {
      lastList = nodeName;
      depth += 1;
    } else {
      if (
         blockType !== 'unordered-list-item' &&
         blockType !== 'ordered-list-item'
       ) {
         lastList = '';
         depth = -1;
       }
       if (!firstBlock) {
         chunk = getBlockDividerChunk(
           blockType,
           depth,
           getBlockData(node)
         );
       } else {
         chunk = getFirstBlockChunk(
           blockType,
           getBlockData(node)
         );
         firstBlock = false;
       }
    }
  }
  if (!chunk) {
    chunk = getEmptyChunk();
  }

  inlineStyle = processInlineTag(nodeName, node, inlineStyle);

  let child = node.firstChild;
  while (child) {
    const entityId = getEntityId(child);
    const { chunk: generatedChunk } = genFragment(child, inlineStyle, depth, lastList, (entityId || inEntity));
    chunk = joinChunks(chunk, generatedChunk);
    const sibling = child.nextSibling;
    child = sibling;
  }

  return { chunk };
}

function getChunkForHTML(html: string): Object {
  const sanitizedHtml = html.trim().replace(REGEX_NBSP, SPACE);
  const safeBody = getSafeBodyFromHTML(sanitizedHtml);
  if (!safeBody) {
    return null;
  }
  firstBlock = true;
  const { chunk } = genFragment(safeBody, new OrderedSet(), -1, '', undefined);
  return { chunk };
}

export default function htmlToDraft(html: string): Object {
  const chunkData = getChunkForHTML(html);
  if (chunkData) {
    const { chunk } = chunkData;
    let entityMap = new OrderedMap({});
    // chunk.entities && chunk.entities.forEach(entity => {
    //   entityMap = entityMap.set(entity, Entity.get(entity));
    // });
    let start = 0;
    return {
      contentBlocks: chunk.text.split('\r')
      .map(
        (textBlock, ii) => {
          const end = start + textBlock.length;
          const inlines = chunk && chunk.inlines.slice(start, end);
          const entities = chunk && chunk.entities.slice(start, end);
          const characterList = new List(
            inlines.map((style, index) => {
              const data = { style, entity: null };
              if (entities[index]) {
                data.entity = entities[index];
              }
              return CharacterMetadata.create(data);
            }),
          );
          start = end;
          return new ContentBlock({
            key: genKey(),
            type: chunk && chunk.blocks[ii].type,
            depth: chunk && chunk.blocks[ii].depth,
            data: chunk && chunk.blocks[ii].data,
            text: textBlock,
            characterList,
          });
        },
      ),
      entityMap,
    };
    return null;
  }
  return null;
}
