import { useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';

import styled from 'styled-components';

const NoResultWrapper = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
`;

const NoResultNumber = styled.div`
  color: #64c2eb;
  font-size: 6rem;
  font-weight: bold;
`;

const NoResultMsg = styled.div`
  color: ${({ isDark }) => (isDark ? 'white' : '#424242')};
  font-size: 2rem;
  font-weight: bold;
`;

const NoResultDesc = styled.div`
  color: ${({ isDark }) => (isDark ? 'white' : '#424242')};
  font-size: 1rem;
`;

const GoToMainBtn = styled.div`
  background-color: #64c2eb;
  color: white;
  border-radius: 5px;
  padding: 0.7rem 1rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const NoResult = () => {
  const { isDarkMode } = useSelector(state => state.theme);
  const history = createBrowserHistory({ forceRefresh: true });
  const goToMain = () => history.push('/');

  return (
    <NoResultWrapper>
      <NoResultNumber>404</NoResultNumber>
      <NoResultMsg isDark={isDarkMode}>앗! 찾으시는 결과가 없네요.</NoResultMsg>
      <NoResultDesc isDark={isDarkMode}>
        입력하신 검색어가 정확한지 다시 한번 확인해 주세요.
      </NoResultDesc>
      <GoToMainBtn onClick={goToMain}>메인으로</GoToMainBtn>
    </NoResultWrapper>
  );
};

export default NoResult;
