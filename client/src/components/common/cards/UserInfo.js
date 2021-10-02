import React from 'react';
import styled from 'styled-components';

import svgToComponent from '../../../utils/svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`;

const ProfileImage = styled.img`
  width: 20%;
  border-radius: 50%;
`;

const Svg = styled.div`
  width: 20%;
`;

const Nickname = styled.div`
  line-height: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1rem;
  @media (max-width: 1200px) {
    font-size: 1.2rem;
  }
  @media (max-width: 900px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const UserInfo = ({ image_url, nickname }) => {
  return (
    <Wrapper>
      {image_url && <ProfileImage src={image_url} alt={image_url} />}
      {!image_url && <Svg>{svgToComponent({ svgName: 'chef', props: { width: '100%' } })}</Svg>}
      <Nickname>{nickname}</Nickname>
    </Wrapper>
  );
};

export default UserInfo;
