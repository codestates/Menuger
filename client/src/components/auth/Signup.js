import { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

import InputForm from '../common/forms/InputForm';
import validator from '../../utils/validation';
import useToast from '../../hooks/toast/useToast';
import logo from '../../utils/logoImage/logTextOneLine.png';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.div``;

const Logo = styled.img`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-top: 2em;
`;

const UserInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-bottom: 5rem;

  &.isDark {
    & > div > input {
      background-color: transparent;
      color: white;
      &::placeholder {
        color: white;
      }
    }
  }
`;

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
  margin-top: 3rem;
  &.isDark {
    color: white;
  }
`;

const LoginLink = styled.span`
  margin-left: 0.5rem;
  color: #ffc436;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`;

const Signup = ({ handleMenuClick, hideModal }) => {
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { isDarkMode } = useSelector(state => state.theme);

  const emailRef = useRef();
  const nicknameRef = useRef();
  const pwdRef = useRef();
  const pwdConfirmRef = useRef();

  const addMessage = useToast();

  const checkRefs = () => {
    const refs = [emailRef, nicknameRef, pwdRef, pwdConfirmRef];
    for (const ref of refs) {
      const isValid = ref.current?.getValidation();
      if (!isValid) {
        ref.current.focusInputRef();
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const allRefsValid = checkRefs();
    if (!allRefsValid) {
      return;
    }

    try {
      setDisabled(true);
      const {
        data: { message },
        status,
      } = await axios.post(`${process.env.REACT_APP_ENDPOINT_URL}/users/signup`, {
        email: emailRef.current.getInput(),
        nickname: nicknameRef.current.getInput(),
        password: pwdRef.current.getInput(),
      });

      if (status === 201) {
        hideModal();
        addMessage({ message, delay: 1000 });
        handleMenuClick('signin');
      } else {
        setDisabled(false);
        addMessage({ mode: 'error', message: '?????? ????????? ????????? ?????????.' });
      }
    } catch (err) {
      setDisabled(false);
      addMessage({ mode: 'error', message: '??????????????? ?????? ??????????????? ????????? ??? ????????????.' });
    }
  };

  const validateEmail = email => {
    return new Promise(resolve => {
      const isValid = validator('email', email);
      if (isValid) {
        axios
          .post(`${process.env.REACT_APP_ENDPOINT_URL}/users/email`, { email })
          .then(({ data: { message }, status }) => {
            if (status === 200) {
              resolve({ result: true, message });
            } else {
              resolve({ result: false, message });
            }
          })
          .catch(err => {
            resolve({ result: false, message: err.response.data.message });
          });
      } else {
        resolve({ result: false, message: '?????? ???????????? ????????? ???????????????.' });
      }
    });
  };

  const validateNickname = nickname => {
    return new Promise(resolve => {
      axios
        .post(`${process.env.REACT_APP_ENDPOINT_URL}/users/nickname`, { nickname })
        .then(({ data: { message }, status }) => {
          if (status === 200) {
            resolve({ result: true, message });
          } else {
            resolve({ result: false, message });
          }
        })
        .catch(err => {
          resolve({ result: false, message: err.response.data.message });
        });
    });
  };

  const validatePassword = password => {
    return new Promise(resolve => {
      const isValid = validator('password', password);
      if (isValid) {
        resolve({ result: true, message: '??????????????? ???????????? ???????????????.' });
        setIsValidPwd(true);
      } else {
        resolve({
          result: false,
          message: '???????????????, ?????? ?????? 8??? ????????? ??????????????? ??????????????????.',
        });
        setIsValidPwd(false);
      }
    });
  };

  const validatePasswordConfirm = passwordConfirm => {
    return new Promise(resolve => {
      const isValid = passwordConfirm === pwdRef.current.getInput();
      if (isValid) {
        resolve({ result: true, message: '??????????????? ???????????????.' });
      } else {
        resolve({ result: false, message: '??????????????? ???????????? ????????????' });
      }
    });
  };

  return (
    <Wrapper>
      <Header>
        <Logo src={logo} width="170px" />
      </Header>
      <Form>
        <UserInput className={isDarkMode ? 'isDark' : ''}>
          <InputForm
            className={isDarkMode ? 'isDark' : ''}
            ref={emailRef}
            placeholder="?????????"
            type="text"
            validate={validateEmail}
          />
          <InputForm
            className={isDarkMode ? 'isDark' : ''}
            ref={nicknameRef}
            placeholder="?????????"
            type="text"
            validate={validateNickname}
          />
          <InputForm
            className={isDarkMode ? 'isDark' : ''}
            ref={pwdRef}
            placeholder="????????????"
            type="password"
            validate={validatePassword}
          />
          <InputForm
            className={isDarkMode ? 'isDark' : ''}
            ref={pwdConfirmRef}
            placeholder="???????????? ??????"
            type="password"
            validate={validatePasswordConfirm}
            disabled={!isValidPwd}
          />
        </UserInput>
        <SubmitBtn onClick={handleSubmit} disabled={disabled}>
          ????????????
        </SubmitBtn>
      </Form>
      <Footer className={isDarkMode ? 'isDark' : ''}>
        ?????? ??????????????????? <LoginLink onClick={() => handleMenuClick('signin')}>?????????</LoginLink>
      </Footer>
    </Wrapper>
  );
};

export default Signup;
