
import React, { useImperativeHandle, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function RichTextEditor(porps, ref) {
    const [editorState, setEditorState] = useState(
        // 创建一个没有内容的编辑对象
        EditorState.createEmpty()
    )
    // 过程中实施的回调
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    };
    const getDetail = () => {
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    useImperativeHandle(ref, () => {
        return {getDetail}
    })
    return (
        <>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
            />
            {/* <textarea
                disabled
                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} */}
            {/* /> */}
        </>
    )
}
export default React.forwardRef(RichTextEditor)


