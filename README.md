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
const { contentBlocks, entityMap } = blocksFromHtml;
const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
const editorState = EditorState.createWithContent(contentState);
```
The function parameters are:

1. **html**: HTML content string

2. ***customNodeTransform***: Function to convert custom defined nodes by the user, it is also optional.
    can be used for transformation of an html node to a custom entity. It takes 1 parameter:
       1. `node` (HTML node)
    It returns object with { type, mutalibity, data})

## License
MIT.
