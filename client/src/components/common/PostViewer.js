import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { darken } from 'polished';

//import components
import StandardButton from '../common/buttons/StandardButton';
import PostInfoViewer from './PostInfoViewer';
import CommentBox from './comment/CommentBox';

const PostViewerStyle = styled.div`
  width: 100%;
  padding-right: 10px;

  @media screen and (max-width: 768px) {
    padding-right: 0;
  }
`;

const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  > h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 20px;
    flex-grow: 1;
    font-size: 1.5rem;
    &.isDark {
      color: white;
    }
  }

  > .button-container {
    display: flex;
    gap: 5px;
  }

  > .remove-mode {
    font-size: 0.825rem;
    color: #8e8e8e;
    height: 35px;
    display: flex;
    align-items: center;

    > button {
      font-size: 0.825rem;
      color: #8e8e8e;
      padding: 0 5px;
      border: none;
      background-color: #00000000;
      cursor: pointer;

      &.cancle:hover {
        color: ${darken(0.4, '#8e8e8e')};
      }

      &.remove:hover {
        color: #f66d6d;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: block;

    > h1 {
      width: auto;
      text-indent: 0.5rem;
      margin-right: 0;
      margin-bottom: 15px;
      flex-grow: 0;
    }

    > .remove-mode {
      justify-content: right;
    }
  }
`;

const ViewerSection = styled.section`
  margin-top: 20px;
  display: grid;
  grid-template:
    'main info' auto
    'main comments' 1fr
    / auto 300px;
  gap: 10px 10px;

  > .main {
    width: auto;
    grid-area: main;
  }

  > .info {
    grid-area: info;
  }

  > .comments {
    grid-area: comments;
    position: sticky;
    top: 0;
    left: 0;
    height: fit-content;
    background-color: white;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    grid-template:
      'info'
      'main'
      'comments'
      / 100%;
  }
`;

//temp
const TempComponent = styled.div`
  height: 100%;
  border: solid 1px #000;
  border-radius: 5px;
  padding: 10px;

  &.comments {
    min-height: 300px;
  }

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const PostViewer = ({
  children,
  title = '제목 기본값',
  user,
  bookmarksCount,
  likesCount,
  hashtags,
  postId,
  postType,
  createdAt,
  setCards,
  updatedCardsRef,
}) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const isAuthority = useSelector(state => state.user.email) === user.email;
  const history = createBrowserHistory({ forceRefresh: true });
  const { isDarkMode } = useSelector(state => state.theme);

  const onRemoveMode = () => setIsRemoveMode(true);
  const offRemoveMode = () => setIsRemoveMode(false);

  const goEdit = () => {
    let pathname = '';
    if (postType === 'diets') {
      pathname = '/edit-diet';
    } else if ('recipe') {
      pathname = '/edit-recipe';
    }
    history.push({
      pathname,
      state: { editPostId: postId },
    });
  };

  const removePost = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}`, {
        withCredentials: true,
      });

      history.push({
        pathname: `/${postType}`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PostViewerStyle>
      <ViewerHeader>
        <h1 className={isDarkMode ? 'isDark' : ''}>{title}</h1>
        {isAuthority &&
          (isRemoveMode ? (
            <div className="remove-mode">
              정말로 삭제하시겠습니까?
              <button className="remove" onClick={removePost}>
                삭제
              </button>
              <button className="cancle" onClick={offRemoveMode}>
                취소
              </button>
            </div>
          ) : (
            <div className="button-container">
              <StandardButton onClick={goEdit}>수정</StandardButton>
              <StandardButton backgroundColor="#f66d6d" onClick={onRemoveMode}>
                삭제
              </StandardButton>
            </div>
          ))}
      </ViewerHeader>
      <ViewerSection>
        <div className="info">
          <PostInfoViewer
            postType={postType}
            postId={postId}
            user={user}
            bookmarksCount={bookmarksCount}
            likesCount={likesCount}
            hashtags={hashtags}
            createdAt={createdAt}
            commentsCount={commentsCount}
            setCards={setCards}
            updatedCardsRef={updatedCardsRef}
          />
        </div>
        <div className="main">{children || <TempComponent>Viewer</TempComponent>}</div>
        <div className="comments">
          <CommentBox
            postId={postId}
            postType={postType}
            setCommentsCount={setCommentsCount}
            updatedCardsRef={updatedCardsRef}
          />
        </div>
      </ViewerSection>
    </PostViewerStyle>
  );
};

export default PostViewer;
