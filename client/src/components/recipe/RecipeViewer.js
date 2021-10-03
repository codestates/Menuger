import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const RecipeViewer = ({ content }) => {
  return <Viewer initialValue={content} />;
};

export default RecipeViewer;
