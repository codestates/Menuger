import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import PostInfoButton from '../components/common/buttons/PostInfoButton';
import useToast from '../hooks/toast/useToast';
import { setInteraction } from '../modules/interaction';

const usePostInfoButton = ({
  postId,
  postType,
  active,
  count,
  buttonType,
  nickname,
  author,
  disabled,
  updatedCardsRef,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [num, setNum] = useState(count);
  const [isActive, setIsActive] = useState(active);
  const addMessage = useToast();
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (disabled || isProcessing) {
      return;
    }
    if (!nickname) {
      addMessage({ mode: 'info', message: '로그인을 먼저 진행해주세요', delay: 1000 });
      return;
    }
    try {
      setIsProcessing(true);
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
          setNum(num - 1);
          setIsActive(false);
          updatedCardsRef.current.bookmark = { _id: postId, bookmarksCount };
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
          setNum(num + 1);
          setIsActive(true);
          updatedCardsRef.current.bookmark = { _id: postId, bookmarksCount };
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
          setNum(num - 1);
          setIsActive(false);
          updatedCardsRef.current.like = { _id: postId, likesCount };
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
          setNum(num + 1);
          setIsActive(true);
          updatedCardsRef.current.like = { _id: postId, likesCount };
        }
      }

      if (buttonType === 'subscribe') {
        if (author === nickname) {
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
    } catch (err) {
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return ({ children }) => (
    <PostInfoButton onClick={handleClick} active={isActive} count={num} disabled={disabled}>
      {children}
    </PostInfoButton>
  );
};

export default usePostInfoButton;
