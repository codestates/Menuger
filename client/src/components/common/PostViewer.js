import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { createBrowserHistory } from 'history';

//import components
import StandardButton from '../common/buttons/StandardButton';
import PostInfoViewer from './PostInfoViewer';
import CommentBox from './comment/CommentBox';

//import temporary

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
    flex-grow: 1;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    > h1 {
      text-indent: 0.5rem;
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
}) => {
  const [commentsCount, setCommentsCount] = useState(0);
  const isAuthority = useSelector(state => state.user.email) === user.email;
  const history = createBrowserHistory({ forceRefresh: true });
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
  return (
    <PostViewerStyle>
      <ViewerHeader>
        <h1>{title}</h1>
        {isAuthority && (
          <StandardButton width="fit-content" onClick={goEdit}>
            수정
          </StandardButton>
        )}
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
          />
        </div>
        <div className="main">{children || <TempComponent>Viewer</TempComponent>}</div>
        <div className="comments">
          <CommentBox postId={postId} postType={postType} setCommentsCount={setCommentsCount} />
        </div>
      </ViewerSection>
    </PostViewerStyle>
  );
};

export default PostViewer;
