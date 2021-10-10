import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logoImageYellow from '../../utils/logoImage/logoImageYellow.png';
import logoTextTwoLine from '../../utils/logoImage/logoTextTwoLine.png';

const StyledLink = styled(NavLink)`
  text-decoration: none !important;
  color: #3c4043;
  &.isDark {
    color: white;
  }
  &:hover {
    color: #ffc436;
    cursor: pointer;
  }
  &.active {
    color: #ffc436;
  }
  > :nth-child(1) {
    height: 50px;
    padding: 0;
    padding-right: 5px;
  }
  > :nth-child(2) {
    height: 40px;
    padding: 0;
    padding-bottom: 8px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  * {
    padding: 1rem;
    flex: 1 0 auto;
  }
`;

const LeftContainer = () => {
  const { isDarkMode } = useSelector(state => state.theme);

  return (
    <Container>
      <StyledLink exact to="/">
        <img src={logoImageYellow} alt="로고 이미지"></img>
        <img src={logoTextTwoLine} alt="로고 텍스트"></img>
      </StyledLink>
      <StyledLink className={isDarkMode ? 'isDark' : ''} to="/recipes?sort=dd">
        레시피
      </StyledLink>
      <StyledLink className={isDarkMode ? 'isDark' : ''} to="/diets?sort=dd">
        식단
      </StyledLink>
    </Container>
  );
};

export default LeftContainer;
