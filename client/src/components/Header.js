import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Router, Switch, Route, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

import LandingPage from '../pages/LandingPage';
import RecipePage from '../pages/RecipePage';
import RecipeEditPage from '../pages/RecipeEditPage';
import DietPage from '../pages/DietPage';
import DietEditPage from '../pages/DietEditPage';
import MyPage from '../pages/MyPage';

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  * {
    padding: 1rem;
  }
  flex: 10 1 auto !important;
`;
const MiddleContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const RightContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    padding: 1.2rem;
  }
`;

const HamburgerContainer = styled.div`
  display: none;
  * {
    position: absolute;
    top: 27px;
    right: 32px;
    font-size: 24px;
  }
`;

const WriteByMobile = styled.div`
  padding: 0px;
  display: none;
  * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.2rem;
  }
`;

const WriteContainer = styled.div`
  position: relative;
`;

const HeaderContainer = styled.header`
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: #dde0ea;
  display: flex;
  padding-left: 10rem;
  padding-right: 10rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  > * {
    flex: 1 1 auto;
  }
  @media screen and (max-width: 970px) {
    ${RightContainer} {
      ${props =>
        props.active &&
        css`
          display: none;
        `}
      background-color: #dde0ea;
      flex-direction: column;
      position: absolute;
      top: 80px;
      right: 0px;
      ${WriteByMobile} {
        display: block;
      }
      ${WriteContainer} {
        display: none;
      }
    }
    ${HamburgerContainer} {
      display: block;
    }
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none !important;
  color: black;
  &:hover {
    color: yellow;
    cursor: pointer;
  }
  &.active {
    color: yellow;
  }
`;

const DropdownContainer = styled.div`
  outline: 2px solid black;
  display: flex;
  position: absolute;
  z-index: 1000;
  top: 95%;
  right: -5%;
  flex-direction: column;
  * {
    width: 80px;
    outline: 2px solid black;
    text-align: center;
  }
  :after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }
`;

const Header = () => {
  const [useDropdown, setUseDropdown] = useState(false);
  const [useHamburgerMenu, setUseHamburgerMenu] = useState(true);
  const handleDropdown = () => {
    setUseDropdown(!useDropdown);
  };
  const handleHamburgerMenu = () => {
    setUseHamburgerMenu(!useHamburgerMenu);
  };

  const popRef = useRef(null);
  const onClickOutside = useCallback(({ target }) => {
    if (popRef.current && !popRef.current.contains(target)) {
      setUseDropdown(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <BrowserRouter>
      <HeaderContainer active={useHamburgerMenu}>
        <LeftContainer>
          <StyledLink exact to="/">
            logo
          </StyledLink>
          <StyledLink to="/RecipePage">레시피</StyledLink>
          <StyledLink to="/DietPage">식단</StyledLink>
        </LeftContainer>
        <MiddleContainer>
          <select name="드롭다운" id="">
            <option value="레시피">레시피</option>
            <option value="식단">식단</option>
          </select>
          <input></input>
        </MiddleContainer>
        <RightContainer>
          <div>login</div>
          <div>sign up</div>
          <WriteByMobile>
            <StyledLink to="/RecipeEditPage" onClick={handleHamburgerMenu}>
              레시피
            </StyledLink>
            <StyledLink to="/DietEditPage" onClick={handleHamburgerMenu}>
              식단
            </StyledLink>
          </WriteByMobile>
          <WriteContainer ref={popRef}>
            <button onClick={handleDropdown}>
              write
              {useDropdown ? (
                <DropdownContainer>
                  <StyledLink to="/RecipeEditPage" onClick={handleDropdown}>
                    레시피
                  </StyledLink>
                  <StyledLink to="/DietEditPage" onClick={handleDropdown}>
                    식단
                  </StyledLink>
                </DropdownContainer>
              ) : null}
            </button>
          </WriteContainer>
        </RightContainer>
        <HamburgerContainer>
          <GiHamburgerMenu onClick={handleHamburgerMenu} />
        </HamburgerContainer>
      </HeaderContainer>

      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/RecipePage" component={RecipePage}></Route>
        <Route path="/RecipeEditPage" component={RecipeEditPage}></Route>
        <Route path="/DietPage" component={DietPage}></Route>
        <Route path="/DietEditPage" component={DietEditPage}></Route>
        <Route path="/MyPage" component={MyPage}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Header;
