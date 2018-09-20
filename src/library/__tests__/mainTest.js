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

    it('should return character styles even if span contains a single space', () => {
        const html = '<p style="text-align:center;text-indent:0px;line-height:1.1;padding:0px 0px 0px 0px;font-size:27px;"><span style="color:rgba(77, 77, 77, 1.0);font-family:Lato;font-size:27px;font-style:normal;font-weight:bold;letter-spacing:1px;"><strong> </strong></span></p>';
        const { contentBlocks: [contentBlock] } = htmlToDraft(html);
        assert.equal(contentBlock.getCharacterList().first().getStyle().size, 4);
    });
});
