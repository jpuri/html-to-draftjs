import { Map } from 'immutable';

const blockRenderMap = new Map({
  'header-one': {
    element: 'h1',
  },
  'header-two': {
    element: 'h2',
  },
  'header-three': {
    element: 'h3',
  },
  'header-four': {
    element: 'h4',
  },
  'header-five': {
    element: 'h5',
  },
  'header-six': {
    element: 'h6',
  },
  'unordered-list-item': {
    element: 'li',
  },
  'ordered-list-item': {
    element: 'li',
  },
  blockquote: {
    element: 'blockquote',
  },
  atomic: {
    element: 'figure',
  },
  unstyled: {
    element: 'div',
    aliasedElements: ['p'],
  },
});

module.exports = blockRenderMap;
