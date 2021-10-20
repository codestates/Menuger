import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import useKeyPress from '../../../hooks/useKeyPress';

const { REACT_APP_WEB_MAX_WIDTH } = process.env;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ color }) => (color ? color : 'black')};
  opacity: ${({ opacity }) => (opacity ? opacity : 0.2)};
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 600px;
  max-width: ${REACT_APP_WEB_MAX_WIDTH};
  width: ${({ width }) => (width ? `${width}%` : '100%')};
  height: ${({ height }) => (height ? `${height}%` : '90%')};
  margin: auto;
  padding: ${({ padding }) => (padding ? `${padding}em` : '3rem')};
  border-radius: 10px;
  z-index: 10;
  overflow-y: hidden;
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s linear;
  background-color: ${({ isDark }) => (isDark ? '#424656' : 'white')};
  @media screen and (max-width: 768px) {
    width: 100%;
    height: ${({ height }) => (height ? `${height}%` : '90%')};
    min-width: 100%;
    padding: 50px 8px 8px;
    > ::-webkit-scrollbar {
      display: none;
    }
  }

  @keyframes slideIn {
    0% {
      bottom: -50%;
    }
    100% {
      bottom: 0;
    }
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  color: #333333;
  font-size: 3rem;
  &:hover {
    cursor: pointer;
    color: crimson;
  }
`;

const Content = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const Modal = ({ children, hideModal, style }) => {
  const { isDarkMode } = useSelector(state => state.theme);
  useKeyPress('Escape', hideModal);

  const modalEl = document.getElementById('modal-root');
  if (!modalEl) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={hideModal} color={style.overlayColor} opacity={style.overlayOpacity} />
      <ModalContainer
        width={style.width}
        height={style.height}
        padding={style.padding}
        isDark={isDarkMode}
      >
        <CloseBtn onClick={hideModal}>&times;</CloseBtn>
        <Content>{children}</Content>
      </ModalContainer>
    </>,
    modalEl,
  );
};

export default Modal;
