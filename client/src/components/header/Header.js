import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
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
    ${HamburgerContainer} {
      display: block;
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
  const [userDropdown, setUserDropdown] = useState(false);

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

  const writeRef = useRef(null);
  const userRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const onClickOutside = useCallback(({ target }) => {
    if (writeRef.current && !writeRef.current.contains(target)) {
      setUseDropdown(false);
    }
    if (userRef.current && !userRef.current.contains(target)) {
      setUserDropdown(false);
    }
    if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(target)) {
      setUseHamburgerMenu(true);
    }
    if (
      searchRef.current &&
      !searchRef.current.contains(target) &&
      !searchInputRef.current.contains(target)
    ) {
      setUseSearch(false);
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
        <LeftContainer />
        <SearchContainer useSearch={useSearch} searchInputRef={searchInputRef} />
        <RightContainer
          handleHamburgerMenu={handleHamburgerMenu}
          useDropdown={useDropdown}
          popRef={writeRef}
          userRef={userRef}
          handleDropdown={handleDropdown}
          useHamburgerMenu={useHamburgerMenu}
          setUserDropdown={setUserDropdown}
          userDropdown={userDropdown}
          hamburgerMenuRef={hamburgerMenuRef}
        />
        <HamburgerContainer ref={hamburgerMenuRef}>
          <GiHamburgerMenu onClick={handleHamburgerMenu} />
        </HamburgerContainer>
        <SearchIconContainer ref={searchRef}>
          <BiSearchAlt2 onClick={handleSearch} />
        </SearchIconContainer>
      </HeaderContainer>

      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/recipes" component={RecipePage}></Route>
        <Route path="/RecipeEditPage" component={RecipeEditPage}></Route>
        <Route path="/diets" component={DietPage}></Route>
        <Route path="/DietEditPage" component={DietEditPage}></Route>
        <Route path="/mypage/recipes">
          <MyPage page="0" />
        </Route>
        <Route path="/mypage/diets">
          <MyPage page="1" />
        </Route>
        <Route path="/mypage/delete">
          <MyPage page="2" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Header;
