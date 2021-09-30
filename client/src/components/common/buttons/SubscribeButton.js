import styled from 'styled-components';

import ButtonSpinner from '../spinners/ButtonSpinner';

const SubBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  width: 8em;
  height: 2.1em;
  color: ${({ subscribed }) => (subscribed ? '#646060' : 'white')};
  background-color: ${({ subscribed }) => (subscribed ? '#ececec' : '#cc0000')};
  border-radius: 3px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const SubscribeButton = ({ subscribed, toggle, loading, fontSize }) => {
  const spinnerWidth = fontSize * 1.5;

  return (
    <SubBtn subscribed={subscribed} onClick={toggle} fontSize={fontSize} disabled={loading}>
      {loading && <ButtonSpinner width={spinnerWidth} />}
      {!loading && (subscribed ? '구독중' : '구독하기')}
    </SubBtn>
  );
};

export default SubscribeButton;
