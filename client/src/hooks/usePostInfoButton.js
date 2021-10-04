import { useState } from 'react';
import styled from 'styled-components';

import useToast from '../hooks/toast/useToast';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
  & > svg {
    fill: ${({ active }) => active && '#ffcd36'};
    &:hover {
      fill: ${({ active }) => (active ? '#ffe69a' : '#b3b3b3')};
    }
  }
`;

const Counter = styled.div`
  text-align: center;
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const usePostInfoButton = ({ postId, postType, active, count = -1 }) => {
  const [isActive, setIsActive] = useState(active);
  const [num, setNum] = useState(count);
  const [loading, setLoading] = useState(false);
  const addMessage = useToast();

  const toggle = async () => {
    setLoading(true);

    //TODO: replace with axios sub/unsub api call
    //const { message } = await API_CALL_SUB_OR_UNSUB();
    if (isActive) {
      setNum(num - 1);
    } else {
      setNum(num + 1);
    }
    setIsActive(state => !state);
    setLoading(false);

    if (count > -1) {
      return;
    }
    if (isActive) {
      addMessage({ mode: 'info', message: `구독이 취소되었습니다`, delay: 1000 });
    } else {
      addMessage({ mode: 'info', message: `구독이 완료되었습니다`, delay: 1000 });
    }
  };

  return ({ children }) => (
    <Wrapper onClick={toggle} active={isActive} disabled={loading} count={count}>
      <>
        {children}
        {count >= 0 && <Counter>{num}</Counter>}
      </>
    </Wrapper>
  );
};

export default usePostInfoButton;
