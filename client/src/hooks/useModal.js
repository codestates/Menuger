import { useState } from 'react';

import Modal from '../components/common/modal/Modal';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => setIsVisible(true);
  const hideModal = () => setIsVisible(false);

  const ModalContainer = ({ children }) => (
    <>{isVisible && <Modal hideModal={hideModal}>{children}</Modal>}</>
  );

  return { isVisible, showModal, hideModal, ModalContainer };
};

export default useModal;
