import ReactDOM from 'react-dom';
import styled from 'styled-components';

import useKeyPress from '../../../hooks/useKeyPress';

const Overlay = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  z-index: 9;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 1130px;
  width: ${({ width }) => `${width}%`};
  height: ${({ height }) => `${height}%`};
  margin: auto;
  padding: 3rem;
  border-radius: 10px;
  background: white;
  z-index: 9;
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

const Modal = ({ children, hideModal, style }) => {
  useKeyPress('Escape', hideModal);

  const modalEl = document.getElementById('modal-root');
  if (!modalEl) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={hideModal} color={style.overlayColor} opacity={style.overlayOpacity} />
      <ModalContainer width={style.width} height={style.height}>
        <CloseBtn onClick={hideModal}>&times;</CloseBtn>
        <Content>{children}</Content>
      </ModalContainer>
    </>,
    modalEl,
  );
};

export default Modal;
