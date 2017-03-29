# HTML To DraftJS

A library for converting to plain HTML DraftJS Editor content.
Build for use with editor library react-draft-wysiwyg

## Installing

```
npm install html-to-draftjs --save
```

## Using
```
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const blocksFromHtml = htmlToDraft(this.props.content);
const contentBlocks = blocksFromHtml.contentBlocks;
const contentState = ContentState.createFromBlockArray(contentBlocks);
const editorState = EditorState.createWithContent(contentState);
```
