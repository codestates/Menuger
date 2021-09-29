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
import MobileFoodImg from '../utils/undraw_healthy_options_sdo3.svg';
import EatingTogether from '../utils/undraw_Eating_together_re_ux62.svg';
import Cooking from '../utils/undraw_cooking_lyxy.svg';

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 200;
  right: 50px;
  bottom: 50px;
  font-size: 50px;
  color: #ffc436;
  :hover {
    color: #fc9f77;
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
    }
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
  display: flex;
  flex: 1 0 auto;
  h1 {
    padding-bottom: 40%;
  }
  img {
    width: 600px;
    padding-top: 20%;
    padding-left: 30%;
  }
`;
const Section3 = styled.section`
  h1 {
    padding-bottom: 40%;
  }
  img {
    width: 600px;
    padding-top: 20%;
  }
`;

const Section4 = styled.section`
  display: flex;
  flex-direction: column;
  > :first-child {
    flex: 4 0 auto;
  }
  > :last-child {
    flex: 1 0 auto;
  }
  .contents {
    display: flex;
    flex-direction: row;
    > h1 {
      padding-top: 20%;
    }
    > img {
      width: 300px;
      padding-top: 20%;
      padding-left: 30%;
    }
  }
`;

const LandingPage = () => {
  const [useScroll, setUseScroll] = useState();
  const { toastRef } = useSelector(state => state.toastReducer);
  const dispatch = useDispatch();
  const addMessage = useToast();

  const page = () => {
    setUseScroll(0);
    setTimeout(() => {
      setUseScroll(null);
    }, 1);
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
      <ScrollToTop>
        <HiOutlineArrowCircleUp onClick={page} />
      </ScrollToTop>
      <PageScrollerContainer>
        <ReactPageScroller className="scroller" animationTimer={500} customPageNumber={useScroll}>
          <Section1 className="full-page one">
            <h1>
              '오늘 점심 뭐 먹지?'<br></br> '가성비 좋은 식단은 없을까?'<br></br> '새우 알레르기가
              있는데... 새우를 쓰지않는 레시피는 없을까?'<br></br> 이런 고민을 해보신 적이
              있으신가요?
            </h1>
            <SlotMachine />
          </Section1>
          <Section2 className="full-page two">
            <h1>두번째 페이지입니다.</h1>
            <img src={MobileFoodImg} alt="main-second"></img>
          </Section2>
          <Section3 className="full-page three">
            <img src={EatingTogether} alt="third"></img>
            <h1>세번째 페이지입니다.</h1>
          </Section3>
          <Section4 className="full-page four">
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
