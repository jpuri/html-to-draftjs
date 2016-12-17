function getSafeBodyFromHTML(html: string): ?Element {
  var doc;
  var root = null;
  // Provides a safe context
  if (
    document.implementation &&
    document.implementation.createHTMLDocument
  ) {
    doc = document.implementation.createHTMLDocument('foo');
    doc.documentElement.innerHTML = html;
    root = doc.getElementsByTagName('body')[0];
  }
  return root;
}

module.exports = getSafeBodyFromHTML;
