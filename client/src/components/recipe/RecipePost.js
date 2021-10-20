import styled from 'styled-components';
import { useSelector } from 'react-redux';

import PostViewer from '../common/PostViewer';
import RecipeViewer from './RecipeViewer';

const RecipePostStyle = styled.div`
  border: solid 1px #dadde6;
  border-radius: 5px;
  height: 100%;
  padding: 1rem 1.8rem;
  background-color: ${({ isDark }) => (isDark ? '#424656' : 'white')};
`;

const RecipePost = ({ setCards, post, comments, updatedCardsRef }) => {
  const { isDarkMode } = useSelector(state => state.theme);

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
      setCards={setCards}
      updatedCardsRef={updatedCardsRef}
    >
      <RecipePostStyle isDark={isDarkMode}>
        <RecipeViewer content={content} isDark={isDarkMode} />
      </RecipePostStyle>
    </PostViewer>
  );
};

export default RecipePost;
