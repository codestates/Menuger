import styled from 'styled-components';

//import components
import StandardButton from '../common/buttons/StandardButton';
import PostInfoViewer from './PostInfoViewer';

//import temporary

const PostViewerStyle = styled.div``;

const ViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    flex-grow: 1;
    font-size: 2rem;
  }
`;

const ViewerSection = styled.section`
  margin-top: 20px;
  display: grid;
  grid-template:
    'main info' auto
    'main comments' 1fr
    / 7fr 3fr;
  gap: 10px 10px;

  > .main {
    grid-area: main;
  }

  > .info {
    grid-area: info;
  }

  > .comments {
    grid-area: comments;
  }

  @media (max-width: 768px) {
    grid-template:
      'info'
      'main'
      'comments';
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
  comments,
  user,
  bookmarksCount,
  likesCount,
  hashtags,
}) => {
  //comments = 댓글 컴포넌트 props로 전달
  return (
    <PostViewerStyle>
      <ViewerHeader>
        <h1>{title}</h1>
        <StandardButton width="fit-content">수정</StandardButton>
      </ViewerHeader>
      <ViewerSection>
        <PostInfoViewer
          user={user}
          bookmarksCount={bookmarksCount}
          likesCount={likesCount}
          hashtags={hashtags}
        />
        <div className="main">{children || <TempComponent>Viewer</TempComponent>}</div>
        <div className="comments">
          <TempComponent className="comments">댓글 컴포넌트</TempComponent>
        </div>
      </ViewerSection>
    </PostViewerStyle>
  );
};

export default PostViewer;
