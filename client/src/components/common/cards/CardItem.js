import styled from 'styled-components';

import useSubscribe from '../../../hooks/useSubscribe';

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
`;

const Figure = styled.figure`
  height: 0;
  padding-bottom: 60%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover; // 가로, 세로 길이에 상관없이 컨테이너에 맞게
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
  border: 1px solid green;
  width: 40%;
`;

const PostInfo = styled.div`
  border: 1px solid blue;
  width: 60%;
`;

const TagInfo = styled.div`
  border: 1px solid red;
  flex-grow: 1;
`;

const CardItem = ({
  postId,
  postType,
  title,
  subscribed = false,
  img = 'default image', //TODO: Default Image 추가하기
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
      <Figure style={{ backgroundImage: `url(${img})` }}>
        <Img src={img} alt={imgFileName} />
      </Figure>
      <Info>
        <UserInfo userInfo={userInfo}>UserInfo Component</UserInfo>
        <PostInfo postInfo={postInfo}>PostInfo Component</PostInfo>
        <TagInfo tagInfo={tagInfo}>TagInfo Component</TagInfo>
      </Info>
    </CardContainer>
  );
};

export default CardItem;
