import { useState } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useModal from '../../hooks/useModal';
import Signup from '../auth/Signup';
import Signin from '../auth/Signin';
import { ReactComponent as DefaultImage } from '../../svgs/defaultImage.svg';

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

const WriteContainer = styled.div`
  position: relative;
  button {
    border: 0;
    outline: 0;
    background-color: #ffc436;
    font-size: 90%;
    color: white;
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
  justify-content: center;
  * {
    padding: 1.2rem;
  }
  & > .img-wrapper {
    & > .profile-img {
      width: 3rem;
      padding: 0rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  ${({ signedIn }) =>
    signedIn &&
    css`
      svg {
        margin-right: -1.5rem;
        cursor: pointer;
      }
    `}
  @media screen and (max-width: 768px) {
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
      padding-top: 0px;
    }
    ${WriteContainer} {
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
  outline: 1.5px solid black;
  display: flex;
  position: absolute;
  top: 95%;
  right: -5%;
  flex-direction: column;
  * {
    width: 80px;
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

const RightContainer = ({
  handleHamburgerMenu,
  useDropdown,
  popRef,
  handleDropdown,
  useHamburgerMenu,
}) => {
  const userInfo = useSelector(state => state.userReducer);
  const [modalContent, setModalContent] = useState('');
  const { showModal, hideModal, ModalContainer } = useModal({
    width: 30,
    height: 70,
    padding: 2.5,
  });

  const handleMenuClick = menu => {
    setModalContent(menu);
    showModal();
  };

  return (
    <>
      <ModalContainer>
        {modalContent === 'signup' && <Signup handleMenuClick={handleMenuClick} />}
        {modalContent === 'signin' && (
          <Signin handleMenuClick={handleMenuClick} hideModal={hideModal} />
        )}
      </ModalContainer>
      <Container active={useHamburgerMenu} signedIn={!!userInfo.email}>
        {userInfo.email && (
          <div className="img-wrapper" onClick={() => alert('드랍다운 메뉴가 추가되어야 합니다!')}>
            {userInfo.image_url !== 'null' && (
              <img className="profile-img" src={userInfo.image_url} alt={userInfo.image_url} />
            )}
            {userInfo.image_url === 'null' && <DefaultImage width="120" height="120" />}
          </div>
        )}
        {!userInfo.email && (
          <>
            <div onClick={() => handleMenuClick('signin')}>login</div>
            <div onClick={() => handleMenuClick('signup')}>sign up</div>
          </>
        )}
        <WriteByMobile ref={popRef}>
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
            {useDropdown && (
              <DropdownContainer>
                <StyledLink to="/RecipeEditPage" onClick={handleDropdown}>
                  레시피
                </StyledLink>
                <StyledLink to="/DietEditPage" onClick={handleDropdown}>
                  식단
                </StyledLink>
              </DropdownContainer>
            )}
          </button>
        </WriteContainer>
      </Container>
    </>
  );
};

export default RightContainer;
