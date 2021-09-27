import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setToastRef } from '../../modules/toast';

const useToastRef = () => {
  const toastRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (toastRef) {
      dispatch(setToastRef(toastRef));
    }
  }, [dispatch]);

  return toastRef;
};

export default useToastRef;
