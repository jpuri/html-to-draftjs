/* @flow */

import { CharacterMetadata, ContentBlock, genKey } from 'draft-js';
import { List, Map, OrderedSet } from 'immutable';
import getSafeBodyFromHTML from './getSafeBodyFromHTML';
import {
  createTextChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
  getFirstBlockChunk,
  joinChunks,
} from './chunkBuilder';
import getBlockTypeForTag from './getBlockTypeForTag';
import processInlineTag from './processInlineTag';
import getBlockData from './getBlockData';

const SPACE = ' ';
const REGEX_NBSP = new RegExp('&nbsp;', 'g');

let firstBlock = true;

function genFragment(
  node: Object,
  inlineStyle: OrderedSet,
  depth: number,
  lastList: string
): Object {
  const nodeName = node.nodeName.toLowerCase();

  if (nodeName === '#text' && node.textContent !== '\n') {
    return createTextChunk(node, inlineStyle);
  }

  if (nodeName === 'br') {
    return { chunk: getSoftNewlineChunk() };
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
    const { chunk: generatedChunk } = genFragment(child, inlineStyle, depth, lastList);
    if (nodeName.toLowerCase() === 'li' &&
      (child.nodeName.toLowerCase() === 'ul' || child.nodeName.toLowerCase() === 'ol')
    ) {
      chunk = generatedChunk;
    } else {
      chunk = joinChunks(chunk, generatedChunk);
    }
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
  const { chunk } = genFragment(safeBody, new OrderedSet(), -1, '');
  return { chunk };
}

export default function htmlToDraft(html: string): Object {
  const chunkData = getChunkForHTML(html);
  if (chunkData) {
    const { chunk } = chunkData;
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
      entityMap: new Map({}),
    };
    return null;
  }
  return null;
}
