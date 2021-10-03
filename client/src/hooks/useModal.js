import { useState } from 'react';

import Modal from '../components/common/modal/Modal';

const useModal = style => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    if (style.overflow === 'hidden') {
      document.body.style.overflow = 'hidden';
    }
    setIsVisible(true);
  };
  const hideModal = () => {
    if (style.overflow === 'hidden') {
      document.body.style.overflow = 'visible';
    }
    setIsVisible(false);
  };

  const ModalContainer = ({ children }) => (
    <>
      {isVisible && (
        <Modal hideModal={hideModal} style={style}>
          {children}
        </Modal>
      )}
    </>
  );

  return { isVisible, showModal, hideModal, ModalContainer };
};

export default useModal;
