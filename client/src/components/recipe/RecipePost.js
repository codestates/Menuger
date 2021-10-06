import styled from 'styled-components';

import PostViewer from '../common/PostViewer';
import RecipeViewer from './RecipeViewer';

const RecipePostStyle = styled.div``;

const RecipePost = ({ post, comments }) => {
  const { title, content, user, bookmarksCount, likesCount, hashtags } = post;
  return (
    <PostViewer
      title={title}
      comments={comments}
      user={user}
      bookmarksCount={bookmarksCount}
      likesCount={likesCount}
      hashtags={hashtags}
    >
      <RecipePostStyle>
        <RecipeViewer content={post.content} />
      </RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
