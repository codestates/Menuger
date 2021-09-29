import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import svgToComponent from '../../utils/svg';

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
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  * {
    padding: 1rem;
  }
  flex: 10 1 auto !important;
  img {
    width: 80px;
  }
  svg {
    height: 60px;
    padding: 0;
    &:hover {
      animation: rotate 0.5s linear infinite alternate;
      @keyframes rotate {
        50% {
          transform: translateY(4px) rotate(15deg);
        }
        100% {
          transform: translateY(-4px) rotate(-10deg);
        }
      }
    }
  }
`;

const LeftContainer = () => {
  return (
    <Container>
      <StyledLink exact to="/" style={{ fontFamily: 'Debussy' }}>
        {svgToComponent({ svgName: 'logoYellow', props: { width: 65 } })}
      </StyledLink>
      <StyledLink to="/RecipePage">레시피</StyledLink>
      <StyledLink to="/DietPage">식단</StyledLink>
    </Container>
  );
};

export default LeftContainer;
