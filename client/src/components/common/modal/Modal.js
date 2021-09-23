import ReactDOM from 'react-dom';
import styled from 'styled-components';

import useKeyPress from '../../../hooks/useKeyPress';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(1px);
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  max-width: 1130px;
  height: 90%;
  margin: auto;
  padding: 3rem;
  border-radius: 10px;
  background: white;
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
`;

const Modal = ({ children, hideModal }) => {
  useKeyPress('Escape', hideModal);

  const modalEl = document.getElementById('modal-root');
  if (!modalEl) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={hideModal} />
      <ModalContainer>
        <CloseBtn onClick={hideModal}>&times;</CloseBtn>
        <Content>{children}</Content>
      </ModalContainer>
    </>,
    modalEl,
  );
};

export default Modal;
