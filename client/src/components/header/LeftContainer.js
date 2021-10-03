import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import logoImageYello from '../../utils/logoImage/logoImageYello.png';
import logoTextTwoLine from '../../utils/logoImage/logoTextTwoLine.png';

const StyledLink = styled(NavLink)`
  text-decoration: none !important;
  color: black;
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
  }
`;

const LeftContainer = () => {
  return (
    <Container>
      <StyledLink exact to="/">
        <img src={logoImageYello} alt="로고 이미지"></img>
        <img src={logoTextTwoLine} alt="로고 텍스트"></img>
      </StyledLink>
      <StyledLink to="/RecipePage">레시피</StyledLink>
      <StyledLink to="/DietPage">식단</StyledLink>
    </Container>
  );
};

export default LeftContainer;
