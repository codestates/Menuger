import styled from 'styled-components';
import svgToComponent from '../../utils/svg';

//import components
import LikeButton from '../common/buttons/LikeButton';
import BookMarkButton from '../common/buttons/BookmarkButton';
import HashtagInfo from './cards/HashtagInfo';
import SubscribeButton from './buttons/SubscribeButton';

const PostInfoViewerStyle = styled.div`
  min-height: 200px;
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

const Svg = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: #dadde6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    border: solid 2px#ffc436;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const SocialInfoContainer = styled.div`
  display: grid;
  grid-template: 1fr 1fr / fit-content(100%) 1fr;
  column-gap: 20px;
  row-gap: 10px;

  > .profile-image {
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
  }

  > .profile {
    width: 100px;
    text-decoration: none;
    display: flex;

    > #nickname {
      text-indent: 4px;
      margin-top: 10px;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  > .button-container {
    display: flex;
    justify-content: space-between;
    > button {
      width: 40px;
      height: 40px;
    }
  }

  @media screen and (max-width: 768px) {
    column-gap: 40px;
  }
`;

const PostInfoViewer = ({ user = {}, bookmarksCount = 0, likesCount = 0, hashtags = [] }) => {
  hashtags = ['temp1', 'temp2'];
  return (
    <PostInfoViewerStyle>
      <SocialInfoContainer>
        <div className="profile-image">
          <Svg>
            {svgToComponent({ svgName: 'chef', props: { width: '1.3rem', height: '1.3rem' } })}
          </Svg>
        </div>

        <a className="profile" href="#">
          <div id="nickname">{user.nickname || 'default'}</div>
        </a>
        <div className="button-container">
          <SubscribeButton />
          <LikeButton
            width="40px"
            height="40px"
            imageSize="2rem"
            fontSize="1.1rem"
            number={likesCount}
          />
          <BookMarkButton
            width="40px"
            height="40px"
            imageSize="2rem"
            fontSize="1.1rem"
            number={bookmarksCount}
          />
        </div>
      </SocialInfoContainer>
      <HashtagInfo hashtags={hashtags} />
    </PostInfoViewerStyle>
  );
};

export default PostInfoViewer;
