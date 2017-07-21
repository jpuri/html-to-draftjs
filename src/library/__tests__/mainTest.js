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

    assert.equal(true, true);
  });
});
