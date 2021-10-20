import { useState } from 'react';
import produce from 'immer';

import Modal from '../components/common/modal/Modal';

const useModal = (style, setCards, cardsRef) => {
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
    if (cardsRef?.current) {
      const { bookmark, like, comment } = cardsRef.current;
      if (!bookmark && !like && !comment) return;
      setCards(
        produce(draft => {
          for (const cardData of draft) {
            if (bookmark && cardData._id === bookmark._id) {
              cardData.bookmarksCount = bookmark.bookmarksCount;
            }
            if (like && cardData._id === like._id) {
              cardData.likesCount = like.likesCount;
            }
            if (comment && cardData._id === comment._id) {
              cardData.commentsCount = comment.commentsCount;
            }
          }
        }),
      );
      cardsRef.current = {};
    }
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
