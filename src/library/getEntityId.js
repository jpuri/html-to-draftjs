import { Entity } from 'draft-js';

const getEntityId = (node) => {
  let entityId = undefined;
  if (
    node instanceof HTMLAnchorElement
  ) {
    const entityConfig = {};
    if (node.dataset.mention !== undefined) {
      entityConfig.url = node.href;
      entityConfig.text = node.innerHTML;
      entityConfig.value = node.dataset.value;
      entityId = Entity.create(
        'MENTION',
        'IMMUTABLE',
        entityConfig,
      );
    } else {
      entityConfig.url = node.href;
      entityConfig.title = node.innerHTML;
      entityConfig.target = node.target;
      entityId = Entity.create(
        'LINK',
        'MUTABLE',
        entityConfig,
      );
    }
  }
  return entityId;
}

module.exports = getEntityId;
