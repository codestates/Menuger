import styled from 'styled-components';

import BookmarkButton from '../buttons/BookmarkButton';
import LikeButton from '../buttons/LikeButton';
import CommentMark from '../buttons/CommentMark';
import defaultImage from '../../../utils/logoImage/logoImageYellow.png';
import UserInfo from './UserInfo';
import HashtagInfo from './HashtagInfo';

const CardContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  gap: 0.5rem;
  &:hover > div.shadow {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  @media screen and (min-width: 769px) {
    padding: 0 1rem;
    width: 50%;
  }
  @media screen and (min-width: 900px) {
    width: 33.333%;
  }
  @media screen and (min-width: 1200px) {
    width: 25%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
`;

const Figure = styled.figure`
  height: 0;
  padding-bottom: 60%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #ebebeb;
  transition: all 0.3s;
  border-radius: 7px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  &:hover {
    transform: scale(1.2);
    transition: all 0.3s;
    cursor: pointer;
  }
`;

const Img = styled.img`
  display: none;
`;

const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 3%;
`;

const UserInfoWrapper = styled.div`
  width: 60%;
  padding-bottom: 0.5rem;
`;

const HashtagInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 15%;
  border-top: 1px solid #e4e4e4;
`;

const Border = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0rem 1rem;
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  border-radius: 7px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  @media (max-width: 768px) {
    margin: 0;
  }
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const PostInfo = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const CardItem = ({
  postId,
  postType = 'recipe',
  title,
  thumbnail_url,
  originalFileName,
  user,
  commentsCount,
  likesCount,
  bookmarksCount,
  hashtags,
  updatedAt,
  handleCardClick,
}) => {
  return (
    <CardContainer>
      <Wrapper>
        <Figure
          onClick={() => handleCardClick(postId)}
          style={{
            backgroundImage: `url(${thumbnail_url || defaultImage})`,
            backgroundSize: `${!thumbnail_url && '50%'}`,
          }}
        >
          <Img src={thumbnail_url} alt={originalFileName} />
        </Figure>
      </Wrapper>
      <Info>
        <UserInfoWrapper>
          <UserInfo
            handleCardClick={() => handleCardClick(postId)}
            image_url={user.image_url}
            nickname={user.nickname}
            title={title}
            updatedAt={updatedAt}
          />
        </UserInfoWrapper>
        <PostInfo>
          <BookmarkButton number={bookmarksCount} />
          <LikeButton number={likesCount} />
          <CommentMark number={commentsCount} />
        </PostInfo>
      </Info>
      {!!hashtags.length && (
        <HashtagInfoWrapper>
          <HashtagInfo hashtags={hashtags} />
        </HashtagInfoWrapper>
      )}
      <Border className="shadow" />
    </CardContainer>
  );
};

export default CardItem;
