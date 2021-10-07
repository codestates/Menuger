import React from 'react';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';

import calcDateDiffToString from '../../../utils/date';

import ProfileImage from '../ProfileImage';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const InnerWrapper = styled.div`
  flex-grow: 1;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  font-size: 0.9rem;
  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }
  @media (max-width: 900px) {
    font-size: 1.3rem;
  }
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const Nickname = styled.div`
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.8rem;
  color: #606060;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const CreatedAt = styled.div`
  font-size: 0.8rem;
  color: #606060;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
  @media (max-width: 900px) {
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const UserInfo = ({ postType, image_url, nickname, title, createdAt, handleCardClick }) => {
  const history = createBrowserHistory({ forceRefresh: true });

  const handleUserClick = () => {
    localStorage.setItem('searched', `@${nickname}`);
    localStorage.setItem('option', `/${postType}`);
    history.push({
      pathname: `/${postType}`,
      search: '?sort=dd',
      state: { input: `@${nickname}` },
    });
  };

  return (
    <Wrapper>
      <div className="profile-image-container">
        <ProfileImage
          onClick={handleUserClick}
          src={image_url}
          alt={image_url}
          size="30px"
          mobileSize="45px"
          iconSize="60%"
        />
      </div>

      <InnerWrapper>
        <Title onClick={handleCardClick}>{title}</Title>
        <Nickname onClick={() => handleUserClick(nickname)}>{nickname}</Nickname>
        <CreatedAt onClick={handleCardClick}>{calcDateDiffToString(createdAt)}</CreatedAt>
      </InnerWrapper>
    </Wrapper>
  );
};

export default UserInfo;
