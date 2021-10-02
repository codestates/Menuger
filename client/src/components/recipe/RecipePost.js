import styled from 'styled-components';

//import components
import PostViewer from '../common/PostViewer';

const RecipePostStyle = styled.div``;

const RecipePost = ({ title, content, comments }) => {
  return (
    <PostViewer title={title} comments={comments}>
      <RecipePostStyle>{/* 여기에 레시피 뷰어 넣어주시면 됩니다~ */}</RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
