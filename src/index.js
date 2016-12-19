import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, ContentState, EditorState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from './library';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

class Playground extends Component {

  state = {
    outputEditorState: undefined,
  }

  onInputEditorChange = (inputEditorState) => {
    const rawContent = convertToRaw(inputEditorState.getCurrentContent());
    const html = draftToHtml(rawContent);
    const contentBlock = htmlToDraft(html);
    console.log('1', htmlToDraft(html) && htmlToDraft(html).contentBlocks)
    console.log('2', convertFromHTML(html) && convertFromHTML(html))
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const outputEditorState = EditorState.createWithContent(contentState);
      this.setState({
        inputEditorState,
        outputEditorState,
      });
    }
  }

  render() {
    return (
      <div>
        <div style={{ height: 200 }}>
          <Editor onEditorStateChange={this.onInputEditorChange} />
        </div>
        <div style={{ height: 200 }}>
          <textarea
            disabled
            className="demo-content"
            value={this.state.inputEditorState && draftToHtml(convertToRaw(this.state.inputEditorState.getCurrentContent()))}
          />
        </div>
        <div style={{ height: 200 }}>
          <Editor editorState={this.state.outputEditorState} />
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Playground />,
  document.getElementById('root')
);
