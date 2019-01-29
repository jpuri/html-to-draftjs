const getSafeBodyFromHTML = (html: string): ?Element => {
  var isNode = new Function(
    'try {return this===global;}catch(e){return false;}',
  );

  if (!isNode) {
    var doc;
    var root = null;
    if (document.implementation && document.implementation.createHTMLDocument) {
      doc = document.implementation.createHTMLDocument('foo');
      doc.documentElement.innerHTML = html;
      root = doc.getElementsByTagName('body')[0];
    }
    return root;
  } else {
    const jsdom = require('jsdom');
    const { JSDOM } = jsdom;

    const {
      document: jsdomDocument,
      HTMLElement,
      HTMLAnchorElement,
    } = new JSDOM(`<!DOCTYPE html>`).window;
    // HTMLElement and HTMLAnchorElement needed on global for convertFromHTML to work
    global.HTMLElement = HTMLElement;
    global.HTMLAnchorElement = HTMLAnchorElement;

    const doc = jsdomDocument.implementation.createHTMLDocument('foo');
    doc.documentElement.innerHTML = html;
    const body = doc.getElementsByTagName('body')[0];
    return body;
  }
};

export default getSafeBodyFromHTML;
