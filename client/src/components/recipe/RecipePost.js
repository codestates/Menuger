import styled from 'styled-components';

import PostViewer from '../common/PostViewer';
import RecipeViewer from './RecipeViewer';

const RecipePostStyle = styled.div`
  border: solid 1px #dadde6;
  border-radius: 5px;
  padding: 10px;
`;

const RecipePost = ({ post, comments }) => {
  const {
    title,
    content,
    user,
    bookmarksCount,
    likesCount,
    commentsCount,
    hashtags,
    _id: postId,
    createdAt,
  } = post;
  return (
    <PostViewer
      title={title}
      comments={comments}
      user={user}
      bookmarksCount={bookmarksCount}
      likesCount={likesCount}
      commentsCount={commentsCount}
      hashtags={hashtags}
      postId={postId}
      postType="recipes"
      createdAt={createdAt}
    >
      <RecipePostStyle>
        <RecipeViewer content={post.content} />
      </RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
