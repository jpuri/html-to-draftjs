/* @flow */

import { CharacterMetadata, ContentBlock, genKey } from 'draft-js';
import { List, Map } from 'immutable';
import getSafeBodyFromHTML from './getSafeBodyFromHTML';
import {
  createTextChunk,
  getSoftNewlineChunk,
  getEmptyChunk,
  getBlockDividerChunk,
} from './chunkBuilder';
import getBlockTypeForTag from './getBlockTypeForTag';
import blockRenderMap from './blockRenderMap';
import joinChunks from './joinChunks';

const SPACE = ' ';
const REGEX_NBSP = new RegExp('&nbsp;', 'g');

function genFragment(
  node: Object
): Object {
  const nodeName = node.nodeName.toLowerCase();

  if (nodeName === '#text' && node.textContent !== '\n') {
    return createTextChunk(node);
  }

  if (nodeName === 'br') {
    return { chunk: getSoftNewlineChunk() };
  }

  const blockType = getBlockTypeForTag(nodeName, undefined, blockRenderMap);

  let chunk;
  if (blockType) {
    chunk = getBlockDividerChunk(blockType, 0);
  } else {
    chunk = getEmptyChunk();
  }

  let child = node.firstChild;
  while (child) {
    const { chunk: generatedChunk } = genFragment(child);
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

  const { chunk } = genFragment(safeBody);

  return { chunk };
}

export default function htmlToDraft(html: string): Object {
  const chunkData = getChunkForHTML(html);
  if (chunkData) {
    const { chunk } = chunkData;

    let start = 0;
    return {
      contentBlocks: chunk.text.split('\r')
      .filter(textBlock => textBlock.length > 0)
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
          start = end + 1;

          return new ContentBlock({
            key: genKey(),
            type: chunk && chunk.blocks[ii].type,
            depth: chunk && chunk.blocks[ii].depth,
            text: textBlock,
            characterList,
          });
        },
      ),
      entityMap: new Map({}),
    };
  }
  return null;
}
