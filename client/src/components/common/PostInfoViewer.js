import styled from 'styled-components';
import svgToComponent from '../../utils/svg';

import HashtagInfo from './cards/HashtagInfo';
import PostInfoButtons from './buttons/PostInfoButtons';

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

const Svg = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  background-color: #dadde6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: solid 2px #00000000;

  &:hover {
    border-color: #ffc436;
  }

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Image = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  cursor: pointer;
  border: solid 2px #00000000;

  &:hover {
    border-color: #ffc436;
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

  > #nickname {
    display: block;
    width: 100%;
    text-decoration: none;
    text-indent: 4px;
    color: #000;
    display: flex;
    align-items: center;
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

const PostInfoViewer = ({ user = {}, bookmarksCount = 0, likesCount = 0, hashtags = [] }) => {
  const hashtagStyle = {
    fs: '0.8rem',
    fs1200: '0.8rem',
    fs900: '0.8rem',
    fs768: '1rem',
  };
  return (
    <PostInfoViewerStyle>
      <SocialInfoContainer>
        <div className="profile-image">
          {user.image_url && user.image_url !== 'null' ? (
            <Image src={user.image_url} />
          ) : (
            <Svg>
              {svgToComponent({ svgName: 'chef', props: { width: '1.3rem', height: '1.3rem' } })}
            </Svg>
          )}
        </div>
        <a id="nickname" href="#">
          {user.nickname || 'default'}
        </a>
        <div className="button-container">
          <PostInfoButtons likesCount={likesCount} bookmarksCount={bookmarksCount} />
        </div>
      </SocialInfoContainer>
      <HashTagsContainer>
        <HashtagInfo hashtags={hashtags} style={hashtagStyle} />
      </HashTagsContainer>
    </PostInfoViewerStyle>
  );
};

export default PostInfoViewer;
