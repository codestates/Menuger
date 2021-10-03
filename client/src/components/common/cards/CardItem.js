import styled from 'styled-components';

import BookmarkButton from '../buttons/BookmarkButton';
import LikeButton from '../buttons/LikeButton';
import CommentMark from '../buttons/CommentMark';
import defaultImage from '../../../utils/logoImage/logoImageYellow.png';
import UserInfo from './UserInfo';
import HashtagInfo from './HashtagInfo';

const CardContainer = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 0.5rem;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: center;
  font-size: 1rem;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Figure = styled.figure`
  height: 0;
  padding-bottom: 60%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; // 가로, 세로 길이에 상관없이 컨테이너에 맞게
  transition: all 0.3s;
  border-radius: 4px;
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
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const InnerWrapper = styled.div`
  flex-grow: 1;
`;

const UserInfo = styled.div`
  border: 1px solid #646060;
`;

const PostInfo = styled.div`
  border: 1px solid #646060;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const TagInfo = styled.div`
  border: 1px solid #646060;

const UserTagInfoWrapper = styled.div`
  width: 60%;
`;

const CardItem = ({
  _id,
  postType = 'recipe',
  title,
  subscribed,
  thumbnail_url,
  originalFileName,
  user,
  commentsCount,
  likesCount,
  bookmarksCount,
  hashtags,
}) => {
  return (
    <CardContainer>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Wrapper>
        <Figure
          style={{
            backgroundImage: `url(${thumbnail_url || defaultImage})`,
            backgroundSize: `${!thumbnail_url && '50%'}`,
          }}
        >
          <Img src={thumbnail_url} alt={originalFileName} />
        </Figure>
      </Wrapper>
      <Info>
        <UserTagInfoWrapper>
          <UserInfo image_url={user.image_url} nickname={user.nickname} />
          <HashtagInfo hashtags={hashtags} />
        </UserTagInfoWrapper>
        <PostInfo>
           <BookmarkButton number={bookmarksCount} />
           <LikeButton number={likesCount} />
           <CommentMark number={commentsCount} />
        </PostInfo>
      </Info>
    </CardContainer>
  );
};

export default CardItem;
