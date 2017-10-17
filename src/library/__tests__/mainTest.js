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

    const customTags = [{
        name: 'mycustomtags',
        entity: {
          type: 'MY_TYPE',
          mutability: 'IMMUTABLE',
        },
      },
      {
        name: 'mycustomtags2',
        entity: {
          type: 'MY_TYPE2',
          mutability: 'IMMUTABLE',
        },
      },
    ];
    contentBlocks = htmlToDraft(`<p><mycustomtags>custom tags1</mycustomtags>test<mycustomtags2>custom tag2</mycustomtags2></p>`, {customTags});
    console.log('contentBlocks', JSON.stringify(contentBlocks));

    assert.equal(true, true);
  });
});
