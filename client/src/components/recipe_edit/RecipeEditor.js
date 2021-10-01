import { useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import UploadForm from './UploadForm';

const RecipeEditor = ({ editorRef, setImages }) => {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const createImageInsertButton = () => {
      const btn = document.createElement('button');
      btn.style.margin = '0';
      btn.style.backgroundColor = 'transparent';
      btn.ariaLabel = 'Insert image';
      btn.innerHTML = '<i>IMG</i>';
      btn.addEventListener('click', () => setIsUploadingImage(true));
      return btn;
    };

    editorRef.current.editorInst.defaultUI.removeToolbarItem('image');
    editorRef.current.editorInst.defaultUI.insertToolbarItem(
      { groupIndex: 3, itemIndex: 1 },
      {
        name: 'image',
        el: createImageInsertButton(),
        tooltip: 'Insert image',
        style: { backgroundImage: 'none' },
      },
    );
  }, [editorRef]);

  return (
    <>
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        plugins={[[colorSyntax]]}
        ref={editorRef}
        placeholder="나만의 레시피를 작성해보세요😋"
      />
      {isUploadingImage && (
        <UploadForm
          editorRef={editorRef}
          setUploadModal={setIsUploadingImage}
          setImages={setImages}
        />
      )}
    </>
  );
};

export default RecipeEditor;
