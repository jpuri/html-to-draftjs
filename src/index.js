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
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const outputEditorState = EditorState.createWithContent(contentState);
      this.setState({
        outputEditorState,
      });
    }
  }

  render() {
    return (
      <div>
        <Editor onEditorStateChange={this.onInputEditorChange} />
        <Editor editorState={this.state.outputEditorState} />
      </div>
    );
  }
}


ReactDOM.render(
  <Playground />,
  document.getElementById('root')
);
