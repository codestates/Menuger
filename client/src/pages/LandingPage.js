import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactPageScroller from 'react-page-scroller';

import SlotMachine from '../components/SlotMachine';
import Footer from '../components/Footer';
import getCookie from '../utils/cookieParser';
import { setUserInfo } from '../modules/user';
import useToast from '../hooks/toast/useToast';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import MobileFoodImg from '../utils/landingPageImage/undraw_healthy_options_sdo3.svg';
import EatingTogether from '../utils/landingPageImage/undraw_Eating_together_re_ux62.svg';
import Cooking from '../utils/landingPageImage/undraw_cooking_lyxy.svg';
import logoImageYellow from '../utils/logoImage/logoImageYellow.png';
import pngegg from '../utils/landingPageImage/pngegg.png';

const TextContainer = styled.div``;

const ImageContainer = styled.div``;

const CircleContainer = styled.div`
  z-index: 8;
  position: fixed;
  top: 50%;
  right: 2rem;
  margin-top: -56px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Circle = styled.div`
  border: #fc9f77 solid 1px;
  height: 20px;
  width: 20px;
  border-radius: 75px;
  background-color: ${({ active }) => active && '#fc9f77'};
  transition: all 0.2s;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 7;
  right: 10px;
  bottom: 10px;
  font-size: 50px;
  color: #ffc436;
  :hover {
    color: #fc9f77;
    cursor: pointer;
  }
`;

const Section1 = styled.section`
  height: 100vh;
  overflow-x: hidden;
  & > * {
    padding-bottom: 10em;
  }
  ${TextContainer} {
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: left;
    h1 {
      font-weight: bold;
      font-size: 4em;
      padding-bottom: 0.5em;
      &.isDark {
        color: white;
      }
    }
    span {
      font-weight: normal;
      font-size: 1.2em;
      padding-bottom: 1em;
      &.isDark {
        color: white;
      }
    }
    @media (max-width: 768px) {
      padding: 0;
      width: 100%;
      height: 50%;
      align-items: center;
      justify-content: center;
      text-align: center;
      h1 {
        font-size: 2em;
      }
      span {
        width: 80%;
      }
    }
  }
  ${ImageContainer} {
    display: flex;
    flex-direction: column;
    width: 50%;
    > .slotMachineContainer {
      position: relative;
      > :nth-child(2) {
        position: absolute;
        top: 35px;
        left: 35%;
      }
    }
    .logo {
      margin-right: 2em;
      width: 250px;
      &:hover {
        cursor: pointer;
      }
    }
    .reverse {
      transform: rotate(90deg);
      -moz-transform: scaleX(-1);
      -o-transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      transform: scaleX(-1);
      filter: FlipH;
      -ms-filter: 'FlipH';
      width: 300px;
      margin-left: 50px;
    }
    .logoContainer {
      position: relative;
      width: fit-content;
      .clickme {
        position: absolute;
        top: 0;
        left: 0;
      }
      .clickme.isDark {
        color: #ffcd36;
      }
    }
    @media (max-width: 768px) {
      align-items: center;
      width: 100%;
      padding-bottom: 5em;
      .reverse {
        width: 250px;
        margin-left: 0px;
      }
      > .slotMachineContainer {
        > :nth-child(2) {
          top: 20px;
          left: 2%;
        }
      }
      .logo {
        margin-right: 0;
        width: 200px;
      }
    }
  }
`;
const Section2 = styled.section`
  height: 100vh;
  ${TextContainer} {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-bottom: 15em;
    text-align: right;
    h1 {
      font-weight: bold;
      font-size: 3.5em;
      padding-bottom: 0.5em;
      &.isDark {
        color: white;
      }
    }
    span {
      font-weight: normal;
      font-size: 1.2em;
      margin-bottom: 1em;
      &.isDark {
        color: white;
      }
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      justify-content: center;
      align-items: center;
      padding-bottom: 10em;
      text-align: center;
      h1 {
        font-size: 2em;
        padding-bottom: 0.5em;
      }
      span {
        margin-bottom: 1em;
      }
    }
  }
  ${ImageContainer} {
    width: 50%;
    position: relative;
    * {
      width: 100%;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      top: 100px;
    }
  }
`;
const Section3 = styled.section`
  height: 100vh;
  overflow-x: hidden;
  ${TextContainer} {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-bottom: 15em;
    text-align: left;
    h1 {
      font-weight: bold;
      font-size: 3.5em;
      padding-bottom: 0.5em;
      &.isDark {
        color: white;
      }
    }
    span {
      font-weight: normal;
      padding-bottom: 0.5em;
      font-size: 1.2em;
      &.isDark {
        color: white;
      }
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      text-align: center;
      align-items: center;
      justify-content: center;
      padding-bottom: 0;
      h1 {
        font-weight: bold;
        font-size: 2em;
        padding-bottom: 0.5em;
      }
      span {
        font-weight: normal;
        padding-bottom: 0.5em;
        font-size: 1.2em;
      }
    }
  }
  ${ImageContainer} {
    padding: 0;
    * {
      width: 110%;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      align-items: center;
      justify-content: center;
      * {
        width: 100%;
      }
    }
  }
`;

const Section4 = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  .contents {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    height: 70%;
    ${TextContainer} {
      display: flex;
      flex-direction: column;
      width: 60%;
      text-align: right;
      padding-right: 3em;
      h1 {
        font-weight: bold;
        font-size: 4em;
        padding-bottom: 0.5em;
        &.isDark {
          color: white;
        }
      }
      span {
        font-weight: normal;
        font-size: 1.2em;
        margin-bottom: 0.3em;
        &.isDark {
          color: white;
        }
      }
    }
    ${ImageContainer} {
      width: 40%;
      position: relative;
      * {
        width: 90%;
        height: 70%;
      }
    }
  }
  .footer {
    height: 200px;
    width: 100%;
    padding-top: 2em;
    padding-bottom: 2em;
    border-top: 1px #dadde6 solid;
    & > * {
      height: 100%;
    }
  }

  @media (max-width: 768px) {
    .contents {
      flex-direction: column;
      justify-content: space-evenly;
      ${TextContainer} {
        text-align: center;
        width: 110%;
        padding-right: 0;
        h1 {
          font-weight: bold;
          font-size: 2.8em;
          padding-bottom: 0.5em;
        }
        span {
          font-weight: normal;
          font-size: 1.2em;
          margin-bottom: 0.3em;
        }
      }
      ${ImageContainer} {
        width: 100%;
      }
    }
  }
`;

const PageScrollerContainer = styled.div`
  z-index: 100;
  height: 100vh;
  .full-page {
    margin: 0 auto;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    max-width: 1130px;
    height: 100%;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    > * {
      padding-right: 50px;
      padding-left: 50px;
    }
  }
  @media screen and (max-width: 768px) {
    .full-page {
      padding-top: 0rem;
      padding-left: 0rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 1em;
    }
  }
`;

const LandingPage = () => {
  const [useScroll, setUseScroll] = useState(0);
  const { toastRef } = useSelector(state => state.toast);
  const dispatch = useDispatch();
  const addMessage = useToast();
  const [rollingProps, setRollingProps] = useState(true);
  const { isDarkMode } = useSelector(state => state.theme);

  const arr = [0, 1, 2, 3];
  const page = e => {
    if (e >= 0 && e < 4) {
      setUseScroll(e);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  useEffect(() => {
    if (!toastRef) {
      return;
    }
    if (getCookie('kakao_login') === 'success') {
      addMessage({ message: '카카오 로그인에 성공하였습니다.', delay: 500 });
      dispatch(
        setUserInfo({
          email: getCookie('email'),
          image_url: getCookie('image_url'),
          nickname: getCookie('nickname'),
          type: 'kakao',
        }),
      );
    }
    if (getCookie('error') === 'fail') {
      addMessage({ message: '카카오 로그인에 실패하였습니다.' });
    }
  }, [toastRef]);

  const rollingClick = () => {
    setRollingProps(!rollingProps);
  };

  return (
    <>
      <CircleContainer>
        {arr.map(idx => (
          <Circle key={idx} active={idx === useScroll} onClick={() => setUseScroll(idx)} />
        ))}
      </CircleContainer>
      <ScrollToTop>
        <HiOutlineArrowCircleUp
          onClick={() => {
            page(0);
          }}
        />
      </ScrollToTop>
      <PageScrollerContainer>
        <ReactPageScroller
          className="scroller"
          animationTimer={650}
          pageOnChange={setUseScroll}
          customPageNumber={useScroll}
        >
          <Section1 className="full-page">
            <TextContainer>
              <h1 className={isDarkMode ? 'isDark' : ''}>
                맛있는 식사를<br></br>만들어 보세요
              </h1>
              <span className={isDarkMode ? 'isDark' : ''}>
                다양한{' '}
                <span style={{ color: '#fc9f77', fontWeight: 'bold', fontSize: '1em' }}>
                  메뉴저
                </span>
                들이 만든 레시피와 식단을 확인해보세요.
              </span>
              <span className={isDarkMode ? 'isDark' : ''}>
                그리고, 여러분만의 레시피와 식단을 만들고 공유해보세요.
              </span>
            </TextContainer>
            <ImageContainer>
              <div className="slotMachineContainer">
                <img className="reverse" src={pngegg}></img>
                <SlotMachine id="slotMachine" rollingProps={rollingProps} />
              </div>
              <div className="logoContainer">
                <img className="logo" src={logoImageYellow} onClick={rollingClick}></img>
                <span className={`clickme ${isDarkMode ? 'isDark' : ''}`}>Click me!</span>
              </div>
            </ImageContainer>
          </Section1>
          <Section2 className="full-page">
            <ImageContainer>
              <img src={MobileFoodImg}></img>
            </ImageContainer>
            <TextContainer>
              <h1 className={isDarkMode ? 'isDark' : ''}>
                다양한 레시피와<br></br>식단을 찾아보세요
              </h1>
              <span className={isDarkMode ? 'isDark' : ''}>
                알레르기, 건강식, 가성비 등 <br></br>여러분이 원하는
                <span style={{ color: '#fc9f77', fontWeight: 'bold', fontSize: '1em' }}>
                  {' '}
                  키워드
                </span>
                로 검색해보세요.
              </span>
              <span className={isDarkMode ? 'isDark' : ''}>
                수많은 레시피와 식단이 여러분을 기다리고 있습니다.
              </span>
            </TextContainer>
          </Section2>
          <Section3 className="full-page">
            <TextContainer>
              <h1 className={isDarkMode ? 'isDark' : ''}>
                마음에 드는걸 <br></br>찾지 못하셨나요?
              </h1>
              <span className={isDarkMode ? 'isDark' : ''}>그렇다면, 직접 작성해보세요.</span>
              <span className={isDarkMode ? 'isDark' : ''}>
                당신만의{' '}
                <span style={{ color: '#fc9f77', fontWeight: 'bold', fontSize: '1em' }}>
                  특별한
                </span>{' '}
                레시피와 식단을 공유해보세요.
              </span>
            </TextContainer>
            <ImageContainer>
              <img src={EatingTogether} alt="third"></img>
            </ImageContainer>
          </Section3>
          <Section4 className="full-page">
            <div className="contents">
              <ImageContainer>
                <img src={Cooking} alt="fourth"></img>
              </ImageContainer>
              <TextContainer>
                <h1 className={isDarkMode ? 'isDark' : ''}>
                  요리할 준비가 <br></br>되셨나요?
                </h1>
                <span className={isDarkMode ? 'isDark' : ''}>
                  메뉴저와 함께{' '}
                  <span style={{ color: '#fc9f77', fontSize: '1em', fontWeight: 'bold' }}>
                    행복한 요리
                  </span>
                  를 지금 바로 시작해보세요
                </span>
              </TextContainer>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </Section4>
        </ReactPageScroller>
      </PageScrollerContainer>
    </>
  );
};

export default LandingPage;
