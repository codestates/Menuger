import { useSelector } from 'react-redux';

const useToast = () => {
  const { toastRef } = useSelector(state => state.toastReducer);
  const addMessage = ({ mode, message, delay }) => {
    toastRef.current.addMessage({
      mode,
      message,
      delay,
    });
  };

  return addMessage;
};

export default useToast;
