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

const options = {
    customTags: [
        {
            name: 'mytype', 
            entity: {
                type: 'MY_TYPE',
                mutability: 'IMMUTABLE',
            }
        },
    ]
}

const blocksFromHtml = htmlToDraft(this.props.content, options);
const { contentBlocks, entityMap } = blocksFromHtml.contentBlocks;
const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
const editorState = EditorState.createWithContent(contentState);
```

## Options
```
options = {
  customTags: [
    {
        name: 'tagName1',
        entity: {
            type: DraftEntityType,
            mutability: DraftEntityMutability,
            data?: Object
        }
    },
    {
        name: 'tagName2',
        entity: {
            type: DraftEntityType,
            mutability: DraftEntityMutability,
            data?: Object
        }
    },
  ]
}
```