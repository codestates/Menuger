import { useSelector } from 'react-redux';

import { TOAST_DELAY } from '../../components/common/ToastPortal/constants';

const useToast = () => {
  const { toastRef } = useSelector(state => state.toastReducer);
  const addMessage = ({ mode = 'success', message, delay = TOAST_DELAY }, cb) => {
    toastRef.current.addMessage(
      {
        mode,
        message,
        delay,
      },
      cb,
    );
  };

  return addMessage;
};

export default useToast;
