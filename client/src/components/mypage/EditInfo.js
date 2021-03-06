import styled from 'styled-components';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UploadImageForm from './UploadImageForm';
import useToast from '../../hooks/toast/useToast';
import { setUserInfo } from '../../modules/user';
import axios from 'axios';

const defaultImage =
  'https://user-images.githubusercontent.com/38288479/136677201-879af43c-6681-4b4c-8045-a8bfd6b3f3a4.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
  margin-top: 5rem;

  &.isDark {
    & > div {
      color: white;
      & > input {
        background-color: transparent;
        color: white;
        &:focus {
          outline: none;
          padding-top: 2px;
          border-bottom: 2px solid white;
        }
      }
    }
  }
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border: 3px solid #e4e4e4;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    background-color: #e4e4e4;
  }
`;

const Nickname = styled.div`
  font-size: 1.2rem;
  & > input {
    border: none;
    border-bottom: 1px solid #cdc5bf;
    height: 1.5rem;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    &:focus {
      outline: none;
      border-bottom: 1px solid #222222;
    }
  }
`;

const Email = styled.div`
  font-size: 1.2rem;
  & > input {
    border: none;
    border-bottom: 1px solid #cdc5bf;
    height: 1.5rem;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    &:focus {
      outline: none;
      border-bottom: 1px solid #222222;
    }
  }
`;

const Password = styled.div`
  font-size: 1.2rem;
  & > input {
    border: none;
    border-bottom: 1px solid #cdc5bf;
    height: 1.5rem;
    padding-left: 0.5rem;
    font-size: 1.2rem;
    &:focus {
      outline: none;
      border-bottom: 1px solid #222222;
    }
  }
  & > div {
    margin-top: 0.3rem;
    font-size: 0.8rem;
    text-align: right;
    color: gray;
  }
  margin-left: -2.5rem;
`;

const SubmitBtn = styled.div`
  background-color: #fc9f77;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const EditInfo = () => {
  const nickRef = useRef();
  const pwdRef = useRef();
  const user = useSelector(state => state.user);
  const { isDarkMode } = useSelector(state => state.theme);
  const [imageUrl, setImageUrl] = useState(user.image_url ? user.image_url : defaultImage);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const addMessage = useToast();

  const handleSubmit = async () => {
    try {
      if (pwdRef.current.value.trim().length > 0 && pwdRef.current.value.trim().length < 8) {
        addMessage({
          mode: 'warning',
          message: '??? ??????????????? ?????????????????? 8?????? ????????? ??????????????????',
        });
        return;
      }

      if (!nickRef.current.value.trim().length) {
        addMessage({ mode: 'warning', message: '???????????? ??????????????????' });
        return;
      }

      const data = {};
      if (pwdRef.current.value.trim().length > 0) {
        data.password = pwdRef.current.value;
      }

      if (imageUrl !== defaultImage) {
        data.image_url = imageUrl;
      }

      if (nickRef.current.value !== user.nickname) {
        data.nickname = nickRef.current.value;
      }

      if (!Object.keys(data).length) {
        return addMessage({ mode: 'info', message: '????????? ????????? ??????????????????' });
      }

      const {
        data: { message },
        status,
      } = await axios.patch(`${process.env.REACT_APP_ENDPOINT_URL}/users`, data, {
        withCredentials: true,
      });

      if (status === 200) {
        addMessage({ message });
        const userInfo = {
          email: user.email,
          image_url: imageUrl,
          nickname: nickRef.current.value,
          type: user.type,
        };
        dispatch(setUserInfo(userInfo));
        return history.push('/');
      }
      addMessage({ mode: 'error', message });
    } catch (err) {
      addMessage({ mode: 'error', message: err.response.data.message });
    }
  };

  return (
    <Wrapper className={isDarkMode ? 'isDark' : ''}>
      <ProfileImg src={imageUrl} onClick={() => setIsUploadingImage(true)} />
      {isUploadingImage && (
        <UploadImageForm setUploadModal={setIsUploadingImage} setImage={setImageUrl} />
      )}

      <Nickname>
        <span>?????????: </span>
        <input ref={nickRef} type="text" defaultValue={user.nickname} />
      </Nickname>
      <Email>
        <span>?????????: </span>
        <input type="text" defaultValue={user.email} readOnly />
      </Email>
      <Password>
        <span>??? ????????????: </span>
        <input ref={pwdRef} type="password" />
        <div>???????????? ?????? ??????????????? ???????????????.</div>
      </Password>
      <SubmitBtn onClick={handleSubmit}>??????</SubmitBtn>
    </Wrapper>
  );
};

export default EditInfo;
