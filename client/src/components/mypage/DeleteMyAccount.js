import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { setUserInfo } from '../../modules/user';

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
    font-size: 2em;
    color: ${darken(0.1, '#87e0f3')};
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
`;

const ButtonContainer = styled.div`
  margin-top: 3em;
  button {
    width: 6em;
    height: 3em;
    border: none;
    background-color: ${darken(0.1, '#87e0f3')};
    color: white;
    :hover {
      background-color: ${lighten(0.1, '#87e0f3')};
    }
  }
`;

const DeleteMyAccount = () => {
  const [password, setPassword] = useState();
  const userInfo = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const user = {
    email: '',
    image_url: '',
    nickname: '',
    subscribes: [],
    type: 'user',
  };

  const deleteAccount = async () => {
    try {
      await axios
        .delete(`${process.env.REACT_APP_ENDPOINT_URL}/users`, {
          data: { password },
          withCredentials: true,
        })
        .then(dispatch(setUserInfo(user)))
        .then(history.push('/'));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <TextContainer>
        <h1>메뉴저에서 회원탈퇴하시겠습니까?</h1>
        <br></br>
        <span>-회원 정보 확인 후 회원탈퇴가 가능합니다.</span>
        <span>-입력하신 정보는 회원 탈퇴 이외의 목적으로 사용되지 않습니다.</span>
      </TextContainer>
      <FormContainer>
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
