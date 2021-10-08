import { useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../modules/user';
import { useHistory } from 'react-router';

import axios from 'axios';

import useModal from '../../hooks/useModal';
import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import svgToComponent from '../../utils/svg';
import useDarkToggle from '../../hooks/useDarkToggle';

const StyledLink = styled(NavLink)`
  text-decoration: none !important;
  color: black;
  font-weight: normal;
  &:hover {
    color: #ffc436;
    cursor: pointer;
  }
  &.active {
    color: #ffc436;
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
  }
`;

const UserMenuContainer = styled.div`
  text-align: end;
  > span {
    font-weight: bold;
    color: #fc9f77;
    * {
      font-weight: normal;
      color: black;
    }
  }
`;

const WriteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  & > button {
    border: 0;
    outline: 0;
    background-color: #ffc436;
    font-size: 90%;
    color: white;
    border-radius: 5px;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    flex-grow: 0;

    &:hover {
      cursor: pointer;
      background-color: #fc9f77;
    }
    & > svg {
      padding: 0;
      width: 12px;
      height: 12px;
      fill: white;
      margin-left: 0.5rem;
    }
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

const SearchIconContainer = styled.div`
  display: none;
  * {
    position: absolute;
    top: 29px;
    right: 68px;
    font-size: 20px;
  }
`;

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > span {
    cursor: pointer;
    color: #3c4043;
    :hover {
      color: #ffc436;
    }
    text-align: right;
    padding-right: 0;
  }
  * {
    padding: 1.2rem;
    flex: 1 0 auto;
  }
  & > .img-wrapper {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    & > svg:hover {
      fill: #ffc436;
    }
    & > .profile-img {
      width: 3rem;
      padding: 0rem;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        border: 2px solid #ffc436;
        width: calc(3rem + 4px);
        margin: 0 -2px;
      }
    }
    @media screen and (max-width: 768px) {
      height: 90px;
      padding-top: 0;
      padding-bottom: 0;

      svg {
        margin-right: 0;
        padding: 0;
      }
    }
  }
  ${({ signedIn }) =>
    signedIn &&
    css`
      > svg {
        margin-right: -2rem;
        cursor: pointer;
      }
    `}
  @media screen and (max-width: 768px) {
    ${props =>
      props.active &&
      css`
        display: none;
      `}
    background-color: white;
    outline: 1.5px solid black;
    flex-direction: column;
    position: absolute;
    top: 80px;
    right: 0px;
    ${WriteByMobile} {
      display: block;
      padding-top: 0px;
    }
    ${WriteContainer}, ${UserMenuContainer} {
      display: none;
    }
  }
  ${HamburgerContainer} {
    display: block;
  }
  ${SearchIconContainer} {
    display: block;
  }
`;

const DropdownContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  position: absolute;
  top: 100%;
  right: 10%;
  flex-direction: column;
  background-color: white;
  * {
    display: flex;
    width: 50px;
    text-align: center;
    justify-content: center;
  }
  :before {
    z-index: 2;
    content: '';
    position: absolute;
    bottom: 99.5%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
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

const UserDropdown = styled.section`
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  top: 122%;
  left: -6%;
  align-items: center;
  width: 100px;
  background-color: white;
  & > span {
    :hover {
      color: #ffc436;
    }
    cursor: pointer;
  }

  ${props =>
    !props.active &&
    css`
      display: none;
    `}

  * {
    display: flex;
    width: 50px;
    text-align: center;
    justify-content: center;
    z-index: 5;
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
  :before {
    z-index: 2;
    content: '';
    position: absolute;
    bottom: 99.5%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const SignoutButton = styled.span``;

const RightContainer = ({
  handleHamburgerMenu,
  useDropdown,
  popRef,
  userRef,
  handleDropdown,
  useHamburgerMenu,
  setUserDropdown,
  userDropdown,
  hamburgerMenuRef,
}) => {
  const userInfo = useSelector(state => state.user);
  const [modalContent, setModalContent] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const DarkModeToggler = useDarkToggle();
  const { showModal, hideModal, ModalContainer } = useModal({
    width: 30,
    height: 70,
    padding: 2.5,
  });

  const handleMenuClick = menu => {
    setModalContent(menu);
    showModal();
  };

  const user = {
    email: '',
    image_url: '',
    nickname: '',
    subscribes: [],
    type: 'user',
  };

  const signOut = async () => {
    try {
      await axios
        .post(`${process.env.REACT_APP_ENDPOINT_URL}/users/signout`, {}, { withCredentials: true })
        .then(dispatch(setUserInfo(user)))
        .then(history.push('/'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ModalContainer>
        {modalContent === 'signup' && (
          <Signup handleMenuClick={handleMenuClick} hideModal={hideModal} />
        )}
        {modalContent === 'signin' && (
          <Signin handleMenuClick={handleMenuClick} hideModal={hideModal} />
        )}
      </ModalContainer>
      <Container active={useHamburgerMenu} signedIn={!!userInfo.email} ref={hamburgerMenuRef}>
        {userInfo.email && (
          <UserMenuContainer
            onClick={() => {
              setUserDropdown(!userDropdown);
            }}
            ref={userRef}
          >
            <span className="userInfo" style={{ position: 'relative' }}>
              {userInfo.nickname}
              <UserDropdown active={userDropdown}>
                <StyledLink to="/mypage/recipes?sort=dd">마이페이지</StyledLink>
                <SignoutButton onClick={signOut}>로그아웃</SignoutButton>
              </UserDropdown>
            </span>
          </UserMenuContainer>
        )}
        {!userInfo.email && (
          <>
            <span onClick={() => handleMenuClick('signin')}>로그인</span>
            <span onClick={() => handleMenuClick('signup')}>회원가입</span>
          </>
        )}
        <WriteByMobile ref={popRef}>
          {userInfo.email && (
            <StyledLink to="/mypage/recipes?sort=dd">{userInfo.nickname}</StyledLink>
          )}
          <StyledLink to="/edit-recipe" onClick={handleHamburgerMenu}>
            레시피 작성
          </StyledLink>
          <StyledLink to="/edit-diet" onClick={handleHamburgerMenu}>
            식단 작성
          </StyledLink>
          {userInfo.email && <SignoutButton onClick={signOut}>로그아웃</SignoutButton>}
        </WriteByMobile>
        <WriteContainer ref={popRef}>
          <button onClick={handleDropdown}>
            글쓰기
            {svgToComponent({ svgName: 'arrowDown' })}
            {useDropdown && (
              <DropdownContainer>
                <StyledLink to="/edit-recipe" onClick={handleDropdown}>
                  레시피
                </StyledLink>
                <StyledLink to="/edit-diet" onClick={handleDropdown}>
                  식단
                </StyledLink>
              </DropdownContainer>
            )}
          </button>
        </WriteContainer>
      </Container>
      {/* <DarkModeToggler /> */}
    </>
  );
};

export default RightContainer;
