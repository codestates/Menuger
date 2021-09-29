import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactPageScroller from 'react-page-scroller';

import SlotMachine from '../components/SlotMachine';
import Footer from '../components/Footer';
import getCookie from '../utils/cookieParser';
import { setUserInfo } from '../modules/user';
import useToast from '../hooks/toast/useToast';

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

const Section4 = styled.div`
  display: flex;
  flex-direction: column;
  > :first-child {
    flex: 6 0 auto;
  }
  > :last-child {
    flex: 1 0 auto;
  }
`;

const LandingPage = () => {
  const { toastRef } = useSelector(state => state.toastReducer);
  const dispatch = useDispatch();
  const addMessage = useToast();

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
    <PageScrollerContainer>
      <ReactPageScroller className="scroller" animationTimer={500}>
        <section className="full-page">
          <h1>
            '오늘 점심 뭐 먹지?'<br></br> '가성비 좋은 식단은 없을까?'<br></br> '새우 알레르기가
            있는데... 새우를 쓰지않는 레시피는 없을까?'<br></br> 이런 고민을 해보신 적이 있으신가요?
          </h1>
          <SlotMachine />
        </section>
        <section className="full-page">
          <h1>Page 2</h1>
        </section>
        <section className="full-page">
          <h1>Page 3</h1>
        </section>
        <Section4 className="full-page">
          <h1>Page 4</h1>
          <Footer />
        </Section4>
      </ReactPageScroller>
    </PageScrollerContainer>
  );
};

export default LandingPage;
