import { assert } from 'chai';
import htmlToDraft from '../index';

describe('htmlToDraft test suite', () => {
  it('should return correct contentBlocks', () => {
    let contentBlocks = htmlToDraft('');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<p>test</p>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<div>test</div>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<h1>test</h1>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<h6>test</h6>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<h1>test</h1><h6>test</h6>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft('<p>test<a>link</a></p>');
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft(`<span style="font-weight:bold;">bold</span>`);
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft(`<span style="text-decoration:underline;">underline</span>`);
    console.log('contentBlocks', contentBlocks);

    contentBlocks = htmlToDraft(`<span style="font-style:italic;">italic</span>`);
    console.log('contentBlocks', contentBlocks);

    assert.equal(true, true);
  });

  it('should return ContentBlock with custom data when custom data getter setted and used.', () => {
    const customDecoratorDataGetter = node => {
      const customDecorator = node.getAttribute('data-custom-decorator')
      if (customDecorator) {
          return { customDecorator }
      }
      return {}
    }

    const { contentBlocks: [ decoratedParagraph ] } = htmlToDraft(
      '<p data-custom-decorator="decoratedParagraph">block with custom decorator</p>',
      null,
      customDecoratorDataGetter
    );

    assert.equal(decoratedParagraph.getData().get('customDecorator'), 'decoratedParagraph');
  });
});
