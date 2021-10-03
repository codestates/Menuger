import styled from 'styled-components';

import PostViewer from '../common/PostViewer';
import RecipeViewer from './RecipeViewer';

const RecipePostStyle = styled.div``;

const RecipePost = ({ title, content, comments }) => {
  return (
    <PostViewer title={title} comments={comments}>
      <RecipePostStyle>
        <RecipeViewer content={content}></RecipeViewer>
      </RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
