const inlineTags = {
  code: 'CODE',
  del: 'STRIKETHROUGH',
  em: 'ITALIC',
  strong: 'BOLD',
  ins: 'UNDERLINE',
};

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
    //const htmlElement = node;
    inlineStyle = inlineStyle.withMutations((style) => {
      // console.log('style', style)
      // const color = htmlElement.style.color;
      // const backgroundColor = htmlElement.style.backgroundColor;

      // if (fontStyle === 'color') {
      //   style.add('COLOR');
      // } else if (fontStyle === 'backgroundColor') {
      //   style.remove('ITALIC');
      // }
      //
      // if (textDecoration === 'underline') {
      //   style.add('UNDERLINE');
      // }
      // if (textDecoration === 'line-through') {
      //   style.add('STRIKETHROUGH');
      // }
      // if (textDecoration === 'none') {
      //   style.remove('UNDERLINE');
      //   style.remove('STRIKETHROUGH');
      // }
    }).toOrderedSet();
  }
  return inlineStyle;
}
