# HTML To DraftJS

A library for converting plain HTML to DraftJS Editor content.
Build for use with **[react-draft-wysiwyg](https://github.com/jpuri/react-draft-wysiwyg)**.

## Installation

```
npm install html-to-draftjs --save
```

## Usage
```
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

const blocksFromHtml = htmlToDraft(this.props.content);
const { contentBlocks, entityMap } = blocksFromHtml.contentBlock;
const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
const editorState = EditorState.createWithContent(contentState);
```
