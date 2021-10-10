import styled from 'styled-components';
import { useSelector } from 'react-redux';

//import components
import PostViewer from '../common/PostViewer';
import DietColumnContainer from './DietColumnContainer';

const DietPostStyle = styled.div`
  > textarea {
    resize: none;
    display: block;
    width: 100%;
    padding: 10px;
    border: solid 1px #dadde6;
    border-radius: 5px;
    outline: none;
    cursor: default;
    margin-top: 10px;

    &.isDark {
      background-color: transparent;
      color: white;
    }

    &:first-of-type {
      min-height: 60px;
    }

    &:last-of-type {
      min-height: 300px;
    }
  }
`;

const DietPost = ({ post }) => {
  const {
    title,
    subtitle,
    dietColumnList = [],
    content,
    user,
    bookmarksCount,
    likesCount,
    commentsCount,
    hashtags,
    _id: postId,
    createdAt,
  } = post;
  const { isDarkMode } = useSelector(state => state.theme);

  return (
    <PostViewer
      title={title}
      user={user}
      bookmarksCount={bookmarksCount}
      likesCount={likesCount}
      commentsCount={commentsCount}
      hashtags={hashtags}
      postId={postId}
      postType="diets"
      createdAt={createdAt}
    >
      <DietPostStyle>
        <DietColumnContainer dietColumnList={dietColumnList} readonly />
        <textarea className={isDarkMode ? 'isDark' : ''} value={subtitle} readOnly></textarea>
        <textarea className={isDarkMode ? 'isDark' : ''} value={content} readOnly></textarea>
      </DietPostStyle>
    </PostViewer>
  );
};

export default DietPost;
