import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import calcDateDiffToString from '../../utils/date';

import HashtagInfo from './cards/HashtagInfo';
import PostInfoButtons from './buttons/PostInfoButtons';
import ProfileImage from './ProfileImage';

const PostInfoViewerStyle = styled.div`
  border-radius: 5px;
  border: solid 1px #dadde6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 768px) {
    padding: 20px 30px;
  }
`;

const SocialInfoContainer = styled.div`
  display: grid;
  grid-template: 1fr 1fr / fit-content(100%) 1fr;
  column-gap: 20px;
  row-gap: 10px;

  > .profile-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
  }

  > #nickname {
    display: block;
    width: 100%;
    text-decoration: none;
    text-indent: 4px;
    color: #000;
    display: flex;
    align-items: center;
    & > span:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }

  @media screen and (max-width: 768px) {
    > #nickname {
      padding-left: 8%;
    }
  }
`;

const HashTagsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;

  > div {
    margin: 2px;
  }
`;

const OtherArea = styled.section`
  color: #8e8e8e;
  margin-top: 10px;
  font-size: 0.8rem;

  > span {
    &.time {
      margin-right: 0.4rem;
    }

    &.comments-count {
    }
  }
`;

const PostInfoViewer = ({
  postType,
  postId,
  user = {},
  bookmarksCount = 0,
  likesCount = 0,
  commentsCount = 0,
  hashtags = [],
  createdAt,
}) => {
  const history = createBrowserHistory({ forceRefresh: true });
  const hashtagStyle = {
    fs: '0.8rem',
    fs1200: '0.8rem',
    fs900: '0.8rem',
    fs768: '1rem',
  };

  const handleUserInfoClick = nickname => {
    localStorage.setItem('option', `/${postType}`);
    localStorage.setItem('searched', `@${nickname}`);
    history.push({
      pathname: `/${postType}`,
      search: '?sort=dd',
      state: { input: `@${nickname}` },
    });
  };

  return (
    <PostInfoViewerStyle>
      <SocialInfoContainer>
        <div className="profile-image-container">
          <ProfileImage
            src={user.image_url}
            mobileSize="100px"
            onClick={() => handleUserInfoClick(user.nickname)}
          />
        </div>
        <div id="nickname" href="#" onClick={() => handleUserInfoClick(user.nickname)}>
          <span> {user.nickname || 'default'}</span>
        </div>
        <div className="button-container">
          <PostInfoButtons
            postId={postId}
            postType={postType}
            likesCount={likesCount}
            bookmarksCount={bookmarksCount}
            author={user.nickname}
            authorId={user._id}
          />
        </div>
      </SocialInfoContainer>
      <HashTagsContainer>
        <HashtagInfo postType={postType} hashtags={hashtags} style={hashtagStyle} />
      </HashTagsContainer>
      <OtherArea className="other-area">
        <span className="time">{calcDateDiffToString(createdAt)}</span>
        <span className="comments-count">{commentsCount}개의 댓글</span>
      </OtherArea>
    </PostInfoViewerStyle>
  );
};

export default PostInfoViewer;
