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
  }
`;

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 200;
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
  h1 {
    padding-bottom: 40%;
  }
  :nth-child(2) {
    margin-left: 30%;
  }
`;
const Section2 = styled.section`
  h1 {
    padding-bottom: 20%;
  }
  img {
    padding-top: 20%;
    width: 400px;
  }
`;
const Section3 = styled.section`
  h1 {
    padding-bottom: 40%;
  }
  img {
    width: 400px;
    padding-top: 20%;
  }
`;

const Section4 = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > :first-child {
    flex: 2 0 auto;
  }
  > :last-child {
    flex: 1 0 auto;
  }
  .contents {
    display: flex;
    flex-direction: row;
    > * {
      flex: 1 0 auto;
    }
    > h1 {
      padding-top: 20%;
    }
    > img {
      width: 200px;
      padding-top: 20%;
    }
  }
`;

const PageScrollerContainer = styled.div`
  z-index: 100;
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
  const { toastRef } = useSelector(state => state.toastReducer);
  const dispatch = useDispatch();
  const addMessage = useToast();

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
          animationTimer={250}
          pageOnChange={setUseScroll}
          customPageNumber={useScroll}
        >
          <Section1 className="full-page">
            <h1>
              '오늘 점심 뭐 먹지?'<br></br> '가성비 좋은 식단은 없을까?'<br></br> '새우 알레르기가
              있는데... 새우를 쓰지않는 레시피는 없을까?'<br></br> 이런 고민을 해보신 적이
              있으신가요?
            </h1>
            <SlotMachine />
          </Section1>
          <Section2 className="full-page">
            <h1>두번째 페이지입니다.</h1>
            <img src={MobileFoodImg} alt="main-second"></img>
          </Section2>
          <Section3 className="full-page">
            <img src={EatingTogether} alt="third"></img>
            <h1>세번째 페이지입니다.</h1>
          </Section3>
          <Section4 className="full-page">
            <div className="contents">
              <h1>네번째 페이지입니다.</h1>
              <img src={Cooking} alt="fourth"></img>
            </div>
            <Footer />
          </Section4>
        </ReactPageScroller>
      </PageScrollerContainer>
    </>
  );
};

export default LandingPage;
