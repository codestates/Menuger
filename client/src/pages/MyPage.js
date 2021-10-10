import { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditInfo from '../components/mypage/EditInfo';
import MyRecipe from '../components/mypage/MyRecipe';
import MyDiet from '../components/mypage/MyDiet';
import DeleteMyAccount from '../components/mypage/DeleteMyAccount';

const TabContainer = styled.div`
  display: flex;
  position: sticky !important;
  width: 20%;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-right: #c0c0c0 solid 1px;
  margin-top: 2em;
  margin-bottom: 2em;
  &.isDark {
    color: white;
  }
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
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
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
  width: 80%;
  //overflow-y: scroll !important;
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
  const { isDarkMode } = useSelector(state => state.theme);
  const tabCotents = ['내 정보', '내 레시피', '내 식단', '회원 탈퇴'];
  const pageName = [
    '/mypage/edit',
    '/mypage/recipes?sort=dd',
    '/mypage/diets?sort=dd',
    '/mypage/delete',
  ];

  const history = useHistory();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
    <MyPageContainer>
      <TabContainer className={isDarkMode && 'isDark'}>
        <div>
          <span>마이페이지</span>
        </div>
        <ul>
          {tabCotents.map((e, idx) => {
            return (
              <li
                key={idx}
                onClick={() => {
                  history.push(pageName[idx]);
                }}
                className={page['page'] === idx + '' && 'active'}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </TabContainer>
      <ContentsContainer>
        {page['page'] === '0' && <EditInfo />}
        {page['page'] === '1' && <MyRecipe />}
        {page['page'] === '2' && <MyDiet />}
        {page['page'] === '3' && <DeleteMyAccount />}
      </ContentsContainer>
    </MyPageContainer>
  );
};

export default MyPage;
