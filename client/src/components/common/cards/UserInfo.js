import React from 'react';
import styled from 'styled-components';

import svgToComponent from '../../../utils/svg';
import calcDateDiffToString from '../../../utils/date';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileImage = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    border: 2px solid #ffcd36;
    box-sizing: content-box;
    margin: -2px;
  }
`;

const Svg = styled.div`
  width: 20%;
  min-width: 20%;
  height: 100%;
  &:hover {
    cursor: pointer;
    & > svg {
      fill: #ffcd36;
    }
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
  font-size: 1.1rem;
  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 4vw;
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

const UpdatedAt = styled.div`
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

const UserInfo = ({ image_url, nickname, title, updatedAt }) => {
  return (
    <Wrapper>
      {image_url && <ProfileImage src={image_url} alt={image_url} />}
      {!image_url && (
        <Svg>{svgToComponent({ svgName: 'chef', props: { width: '100%', height: '100%' } })}</Svg>
      )}
      <InnerWrapper>
        <Title>{title}</Title>
        <Nickname>{nickname}</Nickname>
        <UpdatedAt>{calcDateDiffToString(updatedAt)}</UpdatedAt>
      </InnerWrapper>
    </Wrapper>
  );
};

export default UserInfo;
