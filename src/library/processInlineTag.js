const inlineTags = {
  b: 'BOLD',
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  i: 'ITALIC',
  s: 'STRIKETHROUGH',
  strike: 'STRIKETHROUGH',
  strong: 'BOLD',
  u: 'UNDERLINE',
};

const boldValues = ['bold', 'bolder', '500', '600', '700', '800', '900'];
const notBoldValues = ['light', 'lighter', '100', '200', '300', '400'];

export default function processInlineTag(
  tag: string,
  node: Object,
  currentStyle: Object
): Object {
  const styleToCheck = inlineTags[tag];
  let inlineStyle;
  if (styleToCheck) {
    inlineStyle = currentStyle.add(styleToCheck).toOrderedSet();
  } else if (node instanceof HTMLElement) {
    inlineStyle = currentStyle;
    const htmlElement = node;
    inlineStyle = inlineStyle.withMutations((style) => {
      const fontWeight = htmlElement.style.fontWeight;
      const fontStyle = htmlElement.style.fontStyle;
      const textDecoration = htmlElement.style.textDecoration;

      if (boldValues.indexOf(fontWeight) >= 0) {
        style.add('BOLD');
      } else if (notBoldValues.indexOf(fontWeight) >= 0) {
        style.remove('BOLD');
      }

      if (fontStyle === 'italic') {
        style.add('ITALIC');
      } else if (fontStyle === 'normal') {
        style.remove('ITALIC');
      }

      if (textDecoration === 'underline') {
        style.add('UNDERLINE');
      }
      if (textDecoration === 'line-through') {
        style.add('STRIKETHROUGH');
      }
      if (textDecoration === 'none') {
        style.remove('UNDERLINE');
        style.remove('STRIKETHROUGH');
      }
    }).toOrderedSet();
  }
  return inlineStyle;
}
