import { useState } from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  width: 15em;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-right: #c0c0c0 solid 1px;
  margin-top: 2em;
  margin-bottom: 2em;
  div {
    border-bottom: #c0c0c0 solid 1px;
    padding-top: 2em;
    padding-bottom: 2em;
    width: 70%;
    span {
      height: 50%;
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    .active {
      color: #fc9f77;
    }
    * {
      padding-top: 4em;
      :hover {
        color: #fc9f77;
        cursor: pointer;
      }
    }
  }
`;

const ContentsContainer = styled.div`
  flex: 4 0 auto;
`;
const MyPageContainer = styled.div`
  display: flex;
  flex-basis: 0;
  justify-content: center;

  margin: 0 auto;
  max-width: 1130px;
  height: 90vh;
`;

const MyPage = () => {
  const [tab, setTab] = useState(0);
  const tabCotents = ['모두 보기', '내 레시피', '내 식단', '로그아웃', '회원 탈퇴'];
  const componentList = {
    0: <div>모두 보기</div>,
    1: '내 레시피',
  };

  const onClick = idx => {
    setTab(idx);
  };

  return (
    <MyPageContainer>
      <TabContainer>
        <div>
          <span>마이페이지</span>
        </div>
        <ul>
          {tabCotents.map((e, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  onClick(idx);
                }}
                className={tab === idx && 'active'}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </TabContainer>
      <ContentsContainer>{componentList[tab]}</ContentsContainer>
    </MyPageContainer>
  );
};

export default MyPage;
