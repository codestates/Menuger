import { useState, useEffect } from 'react';

import { SLIDE_DELAY } from '../../components/common/ToastPortal/constants';

const useToastRemove = ({ toasts, setToasts }) => {
  const [removing, setRemoving] = useState('');

  useEffect(() => {
    if (!removing) {
      return;
    }
    setToasts(prevToasts => prevToasts.filter(prevToast => prevToast.id !== removing));
  }, [removing, setToasts]);

  useEffect(() => {
    if (!toasts.length) {
      return;
    }
    const lastToast = toasts[toasts.length - 1];
    setTimeout(() => setRemoving(lastToast.id), lastToast.delay + SLIDE_DELAY);
  }, [toasts]);

  return removing;
};

export default useToastRemove;
