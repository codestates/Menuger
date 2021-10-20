import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const RecipeViewer = ({ content, isDark }) => {
  return (
    <>
      {!isDark && <Viewer initialValue={content} />}
      {isDark && <Viewer theme="dark" initialValue={content} />}
    </>
  );
};

export default RecipeViewer;
