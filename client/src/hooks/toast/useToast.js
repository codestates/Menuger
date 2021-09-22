import { useSelector } from 'react-redux';

import { TOAST_DELAY } from '../../components/common/ToastPortal/constants';

const useToast = () => {
  const { toastRef } = useSelector(state => state.toastReducer);
  const addMessage = ({ mode = 'success', message, delay = TOAST_DELAY }) => {
    toastRef.current.addMessage({
      mode,
      message,
      delay,
    });
  };

  return addMessage;
};

export default useToast;
