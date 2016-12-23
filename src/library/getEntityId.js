import { Entity } from 'draft-js';

const getEntityId = (node) => {
  let entityId = undefined;
  if (
    node instanceof HTMLAnchorElement
  ) {
    const entityConfig = {};
    entityConfig.url = node.href;
    entityConfig.title = node.innerHTML;
    entityId = Entity.create(
      'LINK',
      'MUTABLE',
      entityConfig,
    );
  }
  return entityId;
}

module.exports = getEntityId;
