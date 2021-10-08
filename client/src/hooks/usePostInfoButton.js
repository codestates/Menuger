import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import PostInfoButton from '../components/common/buttons/PostInfoButton';
import useToast from '../hooks/toast/useToast';
import { setInteraction } from '../modules/interaction';

const usePostInfoButton = ({ postId, postType, active, count, buttonType, nickname, author }) => {
  const [num, setNum] = useState(count);
  const [isActive, setIsActive] = useState(active);
  const addMessage = useToast();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!nickname) {
      addMessage({ mode: 'info', message: '로그인을 먼저 진행해주세요', delay: 1000 });
      return;
    }
    if (buttonType === 'bookmark') {
      if (active) {
        const {
          data: { bookmarksCount },
        } = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/bookmarks`,
          {
            withCredentials: true,
          },
        );
        setNum(bookmarksCount);
        setIsActive(!active);
      } else {
        const {
          data: { bookmarksCount },
        } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/bookmarks`,
          null,
          {
            withCredentials: true,
          },
        );
        setNum(bookmarksCount);
        setIsActive(!active);
      }
    }

    if (buttonType === 'like') {
      if (active) {
        const {
          data: { likesCount },
        } = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/likes`,
          {
            withCredentials: true,
          },
        );
        setNum(likesCount);
        setIsActive(!active);
      } else {
        const {
          data: { likesCount },
        } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}/likes`,
          null,
          {
            withCredentials: true,
          },
        );
        setNum(likesCount);
        setIsActive(!active);
      }
    }

    if (buttonType === 'subscribe') {
      if (author === nickname) {
        alert('같음');
        return;
      }
      if (active) {
        const { status } = await axios.delete(
          `${process.env.REACT_APP_ENDPOINT_URL}/users/subscribe/${author}`,
          {
            withCredentials: true,
          },
        );
        if (status === 200) {
          setIsActive(false);
        }
        addMessage({ mode: 'info', message: `구독이 취소되었습니다`, delay: 1000 });
      } else {
        const { status } = await axios.post(
          `${process.env.REACT_APP_ENDPOINT_URL}/users/subscribe/${author}`,
          null,
          {
            withCredentials: true,
          },
        );
        if (status === 200) {
          setIsActive(true);
        }
        addMessage({ mode: 'info', message: `구독이 완료되었습니다`, delay: 1000 });
      }
    }

    Promise.all([
      axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/recipes`, {
        withCredentials: true,
      }),
      axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/users/${nickname}/interaction/diets`, {
        withCredentials: true,
      }),
    ]).then(responses => {
      dispatch(
        setInteraction({
          recipes: responses[0].data,
          diets: responses[1].data,
        }),
      );
    });
  };

  return ({ children }) => (
    <PostInfoButton onClick={handleClick} active={isActive} count={num}>
      {children}
    </PostInfoButton>
  );
};

export default usePostInfoButton;
