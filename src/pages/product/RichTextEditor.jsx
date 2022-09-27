import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function RichTextEditor(porps, ref) {
  const [editorState, setEditorState] = useState(
    // 创建一个没有内容的编辑对象
    EditorState.createEmpty(),
  );

  const constructor = useCallback(() => {
    const html = porps.detail;
    const contentBlock = htmlToDraft(html || '');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);

      setEditorState(editorState);
    }
  }, [porps.detail]);

  // 过程中实施的回调
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const getDetail = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  useImperativeHandle(ref, () => {
    return { getDetail };
  });

  useEffect(() => {
    constructor();
  }, [constructor]);
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
  );
}
export default React.forwardRef(RichTextEditor);
