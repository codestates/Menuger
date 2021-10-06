import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiSearchAlt2 } from 'react-icons/bi';

import LandingPage from '../../pages/LandingPage';
import RecipePage from '../../pages/RecipePage';
import RecipeEditPage from '../../pages/RecipeEditPage';
import DietPage from '../../pages/DietPage';
import DietEditPage from '../../pages/DietEditPage';
import MyPage from '../../pages/MyPage';

import LeftContainer from './LeftContainer';
import SearchContainer from './SearchContainer';
import RightContainer from './RightContainer';

import useToast from '../../hooks/toast/useToast';

const HamburgerContainer = styled.div`
  display: none;
  * {
    position: absolute;
    top: 27px;
    right: 32px;
    font-size: 24px;
  }
`;

const SearchIconContainer = styled.div`
  display: none;
  * {
    position: absolute;
    top: 29px;
    right: 68px;
    font-size: 20px;
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
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid;
  border-color: rgba(160, 160, 160, 0.25);
  background-color: white;
  display: flex;
  background-color: white;
  padding-left: 10rem;
  padding-right: 10rem;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  > * {
    flex: 1 1 auto;
  }
  @media screen and (max-width: 768px) {
    padding: 0rem;
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
    ${SearchContainer} {
      display: none;
    }
    ${SearchIconContainer} {
      display: block;
    }
  }
`;

const Header = () => {
  const [useDropdown, setUseDropdown] = useState(false);
  const [useHamburgerMenu, setUseHamburgerMenu] = useState(true);
  const [useSearch, setUseSearch] = useState(false);

  const userInfo = useSelector(state => state.user);
  const addMessage = useToast();

  const handleDropdown = () => {
    if (!userInfo.email) {
      addMessage({ mode: 'info', message: '로그인을 먼저 진행해주세요', delay: 1000 });
      return;
    }
    setUseDropdown(!useDropdown);
  };
  const handleHamburgerMenu = () => {
    setUseHamburgerMenu(!useHamburgerMenu);
  };
  const handleSearch = () => {
    setUseSearch(!useSearch);
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
  });

  return (
    <BrowserRouter>
      <HeaderContainer active={useHamburgerMenu}>
        <LeftContainer />
        <SearchContainer useSearch={useSearch} />
        <RightContainer
          handleHamburgerMenu={handleHamburgerMenu}
          useDropdown={useDropdown}
          popRef={popRef}
          handleDropdown={handleDropdown}
          useHamburgerMenu={useHamburgerMenu}
        />
        <HamburgerContainer>
          <GiHamburgerMenu onClick={handleHamburgerMenu} />
        </HamburgerContainer>
        <SearchIconContainer>
          <BiSearchAlt2 onClick={handleSearch} />
        </SearchIconContainer>
      </HeaderContainer>

      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/recipes" component={RecipePage}></Route>
        <Route path="/RecipeEditPage" component={RecipeEditPage}></Route>
        <Route path="/diets" component={DietPage}></Route>
        <Route path="/DietEditPage" component={DietEditPage}></Route>
        <Route path="/MyPage" component={MyPage}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Header;
