import { useState } from 'react';

import SubscribeButton from '../components/common/buttons/SubscribeButton';

const useSubscribe = ({ postId, postType, subscribed: isSubscribed }, fontSize = 12) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [loading, setLoading] = useState(false);

  // !REMOVE: sample api call
  const API_CALL_SUB_OR_UNSUB = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (subscribed) {
          resolve('구독이 취소되었습니다.');
        } else {
          resolve('구독이 신청되었습니다.');
        }
      }, 2000);
    });
  };

  const toggle = async () => {
    setLoading(true);

    //TODO: replace with axios sub/unsub api call
    const { message } = await API_CALL_SUB_OR_UNSUB();

    setSubscribed(subState => !subState);
    setLoading(false);

    //TODO: add custom Toast
    //ex) addMessage({ message });
  };

  return () => (
    <SubscribeButton
      subscribed={subscribed}
      toggle={toggle}
      loading={loading}
      fontSize={fontSize}
    />
  );
};

export default useSubscribe;
