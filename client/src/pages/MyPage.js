import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import MyRecipe from '../components/mypage/MyRecipe';

const TabContainer = styled.div`
  display: flex;
  position: sticky !important;
  width: 230px;
  height: 100vh;
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
      margin-top: 4em;
      :hover {
        color: #fc9f77;
        cursor: pointer;
      }
    }
  }
`;

const ContentsContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll !important;
`;
const MyPageContainer = styled.div`
  display: flex;
  flex-basis: 0;
  justify-content: center;

  margin: 0 auto;
  max-width: 1130px;
  height: 90vh;
`;

const MyPage = page => {
  const [tab, setTab] = useState(0);
  const tabCotents = ['내 레시피', '내 식단', '저장됨', '회원 탈퇴'];
  const pageName = ['/mypage/recipes', '/mypage/diets'];

  const onClick = idx => {
    setTab(idx);
  };

  const history = useHistory();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

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
                  history.push(pageName[idx]);
                }}
                className={tab === idx && 'active'}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </TabContainer>
      <ContentsContainer>
        {tab === 0 && <MyRecipe />}
        {tab === 1 && <div>식단</div>}
      </ContentsContainer>
    </MyPageContainer>
  );
};

export default MyPage;
