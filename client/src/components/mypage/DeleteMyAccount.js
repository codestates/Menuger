import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { setUserInfo } from '../../modules/user';
import useToast from '../../hooks/toast/useToast';

import { lighten, darken } from 'polished';

const Wrapper = styled.div`
  max-width: 900px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3em;
  margin-left: 2em;
  h1 {
    font-weight: bold;
    font-size: 2.5em;
    color: crimson;
    @media (max-width: 768px) {
      font-size: 1em;
      width: 70%;
    }
  }
  span {
    @media (max-width: 768px) {
      font-size: 0.8em;
    }
  }
  &.isDark {
    & > span {
      color: white;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  margin-top: 3em;
  width: 50%;
  height: 10%;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  @media (max-width: 768px) {
    font-size: 0.8em;
    span {
      width: 4em;
    }
    input {
      width: 7em;
    }
  }
  .title {
    font-weight: bold;
  }
  &.isDark {
    color: white;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 3em;
  button {
    padding: 0.8em 1.5em;
    border: none;
    background-color: crimson;
    color: white;
    border-radius: 3px;
    font-weight: bold;
    :hover {
      background-color: ${lighten(0.1, 'crimson')};
      cursor: pointer;
    }
  }
`;

const DeleteMyAccount = () => {
  const [password, setPassword] = useState();
  const userInfo = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const addMessage = useToast();
  const { isDarkMode } = useSelector(state => state.theme);

  const user = {
    email: '',
    image_url: '',
    nickname: '',
    subscribes: [],
    type: 'user',
  };

  const deleteAccount = async () => {
    const withdraw = window.confirm('회원 탈퇴를 진행하겠습니다');
    if (withdraw) {
      try {
        const {
          data: { message },
          status,
        } = await axios.delete(`${process.env.REACT_APP_ENDPOINT_URL}/users`, {
          data: { password },
          withCredentials: true,
        });

        if (status === 200) {
          addMessage({ message });
          dispatch(setUserInfo(user));
          history.push('/');
        }
      } catch (err) {
        addMessage({ mode: 'error', message: err.response.data.message });
      }
    }
  };

  return (
    <Wrapper>
      <TextContainer className={isDarkMode ? 'isDark' : ''}>
        <h1>메뉴저에서 회원탈퇴하시겠습니까?</h1>
        <br></br>
        <span>• 회원 정보 확인 후 회원탈퇴가 가능합니다.</span>
        <span>• 입력하신 정보는 회원 탈퇴 이외의 목적으로 사용되지 않습니다.</span>
      </TextContainer>
      <FormContainer className={isDarkMode ? 'isDark' : ''}>
        <div className="title">
          <span>닉네임</span>
          <span>비밀번호</span>
        </div>
        <div>
          <span>{userInfo.nickname}</span>
          <input type="password" onChange={e => setPassword(e.target.value)}></input>
        </div>
      </FormContainer>
      <ButtonContainer>
        <button onClick={deleteAccount}>회원 탈퇴</button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default DeleteMyAccount;
