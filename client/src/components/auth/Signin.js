import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import useToast from '../../hooks/toast/useToast';
import { setUserInfo } from '../../modules/user';
import svgToComponent from '../../utils/svg';
import useModal from '../../hooks/useModal';
import ServiceReady from '../common/ServiceReady';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.div``;

const Logo = styled.div`
  font-size: 2rem;
`;

const Title = styled.div`
  margin-top: 1em;
  font-size: 1.1rem;
`;

const Form = styled.form`
  margin-top: 2em;
`;

const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-bottom: 5rem;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #cdc5bf;
  font-size: 1.1rem;
  &:focus {
    outline: none;
    border-bottom: 2px solid #222222;
    margin-bottom: -1px;
  }
`;

const Email = styled(Input)``;
const Password = styled(Input)``;

const SubmitBtn = styled.button`
  width: 100%;
  height: 2.5em;
  color: white;
  background-color: #ffc436;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  &:disabled {
    background-color: #696969;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  margin-top: 4rem;
`;

const Text = styled.div`
  font-size: 1.1rem;
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const SocialLoginBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SignupLink = styled.div`
  margin-top: 2rem;
  color: #ffc436;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Signin = ({ handleMenuClick, hideModal }) => {
  const emailRef = useRef();
  const pwdRef = useRef();

  const addMessage = useToast();
  const dispatch = useDispatch();
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);

  const modalConfig = { width: 50, height: 45, padding: 2.5, overflow: 'hidden' };
  const { showModal, ModalContainer } = useModal(modalConfig);

  const handleSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = pwdRef.current.value;

    if (!email) {
      emailRef.current.focus();
      return addMessage({ mode: 'info', message: '이메일을 입력해주세요' });
    }
    if (!password) {
      pwdRef.current.focus();
      return addMessage({ mode: 'info', message: '비밀번호를 입력해주세요' });
    }

    try {
      setDisabled(true);
      const {
        data: {
          data: { user },
        },
        status,
      } = await axios.post(
        `${process.env.REACT_APP_ENDPOINT_URL}/users/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      if (status === 200) {
        hideModal();
        const userInfo = {
          email: user.email,
          image_url: user.image_url,
          nickname: user.nickname,
          subscribes: user.subscribes,
          type: user.type,
        };
        addMessage({ message: '로그인 성공', delay: 500 }, () => {
          dispatch(setUserInfo(userInfo));
          history.push('/');
        });
      }
    } catch (err) {
      setDisabled(false);
      addMessage({ mode: 'error', message: err.response.data.message });
    }
  };

  const handleKakaoLogin = () => {
    window.location.assign(process.env.REACT_APP_KAKAO_URL);
  };

  return (
    <Wrapper>
      <Header>
        <Logo>Logo</Logo>
        <Title>로그인</Title>
      </Header>
      <Form>
        <UserInput>
          <Email ref={emailRef} placeholder="이메일" type="text" />
          <Password ref={pwdRef} placeholder="비밀번호" type="password" />
        </UserInput>
        <SubmitBtn onClick={handleSubmit} disabled={disabled}>
          로그인
        </SubmitBtn>
      </Form>
      <Footer>
        <Text>소셜 로그인</Text>
        <BtnsContainer>
          <SocialLoginBtn onClick={handleKakaoLogin}>
            {svgToComponent({ svgName: 'kakao', props: { width: '60px', height: '60px' } })}
          </SocialLoginBtn>
          <SocialLoginBtn onClick={showModal}>
            {svgToComponent({ svgName: 'google', props: { width: '60px', height: '60px' } })}
          </SocialLoginBtn>
          <ModalContainer>
            <ServiceReady />
          </ModalContainer>
        </BtnsContainer>
        <SignupLink onClick={() => handleMenuClick('signup')}>회원가입</SignupLink>
      </Footer>
    </Wrapper>
  );
};

export default Signin;
