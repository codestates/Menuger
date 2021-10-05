import { useState } from 'react';

import PostInfoButton from '../components/common/buttons/PostInfoButton';
import useToast from '../hooks/toast/useToast';

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
    <PostInfoButton onClick={toggle} active={isActive} disabled={loading} count={count} num={num}>
      {children}
    </PostInfoButton>
  );
};

export default usePostInfoButton;
