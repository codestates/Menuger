import React from 'react';
import styled from 'styled-components';
import ReactPageScroller from 'react-page-scroller';

import SlotMachine from '../components/SlotMachine';

const PageScrollerContainer = styled.div`
  z-index: 100;
  .full-page {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: center;
    font-weight: bold;
    padding-top: 15rem;
    padding-left: 20rem;
  }

  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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

const LandingPage = () => {
  document.body.style.overflow = 'hidden';
  return (
    <PageScrollerContainer>
      <ReactPageScroller animationTimer={500}>
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
        <section className="full-page">
          <h1>Page 4</h1>
        </section>
      </ReactPageScroller>
    </PageScrollerContainer>
  );
};

export default LandingPage;
