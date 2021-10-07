import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';

import { setInteraction } from '../../../modules/interaction';
import BookmarkButton from '../buttons/BookmarkButton';
import LikeButton from '../buttons/LikeButton';
import CommentMark from '../buttons/CommentMark';
import chef from '../../../utils/logoImage/logoImageYellow.png';
import pan from '../../../utils/logoImage/pan.png';
import UserInfo from './UserInfo';
import HashtagInfo from './HashtagInfo';
import useToast from '../../../hooks/toast/useToast';

const CardContainer = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  transition: 0.3s;
  &:hover {
    transform: translateY(-0.7rem);
    transition: 0.3s;
  }
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
  &:nth-child(1) {
    margin-bottom: 0.5rem;
  }
`;

const Figure = styled.figure`
  height: 0;
  padding-bottom: 60%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${({ isDark }) => (isDark ? '#78797b' : '#ebebeb')};
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
  background-color: ${({ isDark }) => isDark && 'white'};
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
`;

const UserInfoWrapper = styled.div`
  width: 65%;
  padding-bottom: 0.5rem;
`;

const HashtagInfoWrapper = styled.div`
  width: 100%;
  margin-top: auto;
  padding: 0.5rem 15%;
  border-top: 1px solid #e4e4e4;
  background-color: ${({ isDark }) => isDark && 'white'};
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;

  @media (min-width: 769px) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    max-height: 3.3em;
  }

  @media (min-width: 900px) {
    max-height: 3em;
  }

  @media (min-width: 1200px) {
    max-height: 3em;
  }
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
  transition: ${({ isDark }) => !isDark && 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'};
  background-color: ${({ isDark }) => isDark && 'white'};
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const PostInfo = styled.div`
  width: 35%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: auto;
`;

const CardItem = ({
  postId,
  postType,
  title,
  thumbnail_url,
  originalFileName,
  user,
  commentsCount,
  likesCount,
  bookmarksCount,
  hashtags,
  createdAt,
  isBookmarked,
  isLiked,
  handleCardClick,
}) => {
  const { isDarkMode } = useSelector(state => state.theme);
  const { nickname } = useSelector(state => state.user);
  const [bookmarksNum, setBookmarksNum] = useState(bookmarksCount);
  const [likesNum, setLikesNum] = useState(likesCount);
  const dispatch = useDispatch();
  const addMessage = useToast();

  const handleBookmarkClick = async () => {
    if (!nickname) {
      addMessage({ mode: 'info', message: '로그인을 먼저 진행해주세요', delay: 1000 });
      return;
    }
    try {
      if (isBookmarked) {
        const {
          data: { bookmarksCount },
        } = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/bookmarks`,
          {
            withCredentials: true,
          },
        );
        setBookmarksNum(bookmarksCount);
      } else {
        const {
          data: { bookmarksCount },
        } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/bookmarks`,
          null,
          {
            withCredentials: true,
          },
        );
        setBookmarksNum(bookmarksCount);
      }

      Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/recipes`, {
          withCredentials: true,
        }),
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/diets`, {
          withCredentials: true,
        }),
      ]).then(responses => {
        dispatch(
          setInteraction({
            recipes: responses[0].data,
            diets: responses[1].data,
          }),
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLikeButtonClick = async () => {
    if (!nickname) {
      addMessage({ mode: 'info', message: '로그인을 먼저 진행해주세요', delay: 1000 });
      return;
    }
    try {
      if (isLiked) {
        const {
          data: { likesCount },
        } = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/likes`,
          {
            withCredentials: true,
          },
        );
        setLikesNum(likesCount);
      } else {
        const {
          data: { likesCount },
        } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/likes`,
          null,
          {
            withCredentials: true,
          },
        );
        setLikesNum(likesCount);
      }

      Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/recipes`, {
          withCredentials: true,
        }),
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/diets`, {
          withCredentials: true,
        }),
      ]).then(responses => {
        dispatch(
          setInteraction({
            recipes: responses[0].data,
            diets: responses[1].data,
          }),
        );
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardContainer>
      <Wrapper>
        <Figure
          isDark={isDarkMode}
          onClick={() => handleCardClick(postId)}
          style={{
            backgroundImage: `url(${thumbnail_url || (postType === 'recipes' ? pan : chef)})`,
            backgroundSize: `${!thumbnail_url && '50%'}`,
          }}
        >
          <Img src={thumbnail_url} alt={originalFileName} />
        </Figure>
      </Wrapper>
      <Info isDark={isDarkMode}>
        <UserInfoWrapper isDark={isDarkMode}>
          <UserInfo
            postType={postType}
            handleCardClick={() => handleCardClick(postId)}
            image_url={user.image_url}
            nickname={user.nickname}
            title={title}
            createdAt={createdAt}
          />
        </UserInfoWrapper>
        <PostInfo isDark={isDarkMode}>
          <BookmarkButton
            active={isBookmarked}
            onClick={handleBookmarkClick}
            number={bookmarksNum}
          />
          <LikeButton active={isLiked} onClick={handleLikeButtonClick} number={likesNum} />
          <CommentMark number={commentsCount} />
        </PostInfo>
      </Info>
      {!!hashtags.length && (
        <HashtagInfoWrapper isDark={isDarkMode}>
          <HashtagInfo postType={postType} hashtags={hashtags} />
        </HashtagInfoWrapper>
      )}
      <Border className="shadow" isDark={isDarkMode} />
    </CardContainer>
  );
};

export default CardItem;
