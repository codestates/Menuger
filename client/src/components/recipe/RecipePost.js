import styled from 'styled-components';

import PostViewer from '../common/PostViewer';
import RecipeViewer from './RecipeViewer';

const RecipePostStyle = styled.div``;

const RecipePost = ({ post, comments }) => {
  return (
    <PostViewer comments={comments}>
      <RecipePostStyle>
        <RecipeViewer content={post.content} />
      </RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
