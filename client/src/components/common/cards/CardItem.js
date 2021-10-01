import styled from 'styled-components';

import useSubscribe from '../../../hooks/useSubscribe';
import defaultImage from '../../../utils/logoImage/logoImageYellow.png';

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
  padding: 0.5rem 0;
  background-color: white;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: center;
  font-weight: bold;
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
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
`;

const UserInfo = styled.div`
  border: 1px solid #646060;
  width: 40%;
`;

const PostInfo = styled.div`
  border: 1px solid #646060;
  width: 60%;
`;

const TagInfo = styled.div`
  border: 1px solid #646060;
  flex-grow: 1;
`;

const CardItem = ({
  postId,
  postType,
  title,
  subscribed = false,
  img,
  imgFileName,
  userInfo,
  postInfo,
  tagInfo,
}) => {
  const SubscribeBtn = useSubscribe({ postId, postType, subscribed }, 12); // ({ postId, postType, subscribed }, fontSize)

  return (
    <CardContainer>
      <Header>
        <Title>{title}</Title>
        <SubscribeBtn />
      </Header>
      <Wrapper>
        <Figure
          style={{
            backgroundImage: `url(${img || defaultImage})`,
            backgroundSize: `${!img && '50%'}`,
          }}
        >
          <Img src={img} alt={imgFileName} />
        </Figure>
      </Wrapper>
      <Info>
        <UserInfo userInfo={userInfo}>UserInfo Component</UserInfo>
        <PostInfo postInfo={postInfo}>PostInfo Component</PostInfo>
        <TagInfo tagInfo={tagInfo}>TagInfo Component</TagInfo>
      </Info>
    </CardContainer>
  );
};

export default CardItem;
