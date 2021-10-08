import ReactDOM from 'react-dom';
import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import Toast from './Toast';
import { SLIDE_DELAY } from './constants';
import useToastPortal from '../../../hooks/toast/useToastPortal';
import useToastRemove from '../../../hooks/toast/useToastRemove';

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastPortal = forwardRef((_, ref) => {
  const [toasts, setToasts] = useState([]);
  const { loaded, portalId } = useToastPortal();
  useToastRemove({ toasts, setToasts });

  const handleClose = id => setToasts(toasts.filter(toast => toast.id !== id));

  useImperativeHandle(ref, () => ({
    addMessage(toast, cb) {
      setToasts([...toasts, { ...toast, id: uuid() }]);
      if (cb && typeof cb === 'function') {
        setTimeout(cb, toast.delay + SLIDE_DELAY);
      }
    },
  }));

  return (
    loaded &&
    ReactDOM.createPortal(
      <ToastContainer>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            mode={toast.mode}
            message={toast.message}
            delay={toast.delay + SLIDE_DELAY}
            handleClose={() => handleClose(toast.id)}
          ></Toast>
        ))}
      </ToastContainer>,
      document.getElementById(portalId),
    )
  );
});

export default ToastPortal;
