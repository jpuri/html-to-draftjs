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

const contentBlock = htmlToDraft(html);
const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
const editorState = EditorState.createWithContent(contentState);
```
