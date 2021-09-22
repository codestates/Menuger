import styled, { keyframes } from 'styled-components';

import { KEYFRAME_END, BOX_TOP, SEC_IN_MS, SLIDE_DELAY } from './constants';

const calcSlideKeyframes = delay => {
  const slideInEnd = KEYFRAME_END / delay;
  const slideOutFrom = KEYFRAME_END - slideInEnd;

  return keyframes`
    0% { 
      right: calc(-100% - ${BOX_TOP}px);
    }
    ${slideInEnd}% {
      right: 0;
    }
    ${slideOutFrom}% {
      right: 0;
    }
    100% { 
      right: calc(-100% - ${BOX_TOP}px);
    }
  `;
};

const modeColorMapper = {
  success: '#07bc0c',
  warning: '#f1c40f',
  info: '#3498db',
  error: '#e74c3c',
};

const ToastBox = styled.div`
  width: 350px;
  display: flex;
  min-height: 75px;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 15px;
  color: white;
  cursor: pointer;
  border-radius: 3px;
  box-sizing: border-box;
  transition: 0.2s;
  animation: ${({ delay }) => calcSlideKeyframes(delay)} ${({ delay }) => delay + 's'} forwards;
  background-color: ${({ mode }) => modeColorMapper[mode]};
  &:hover {
    transition: 0.2s;
    transform: scale(1.05);
    z-index: 1;
  }
`;

const counterKeyframes = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const Counter = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  background-color: white;
  opacity: 0.8;
  animation: ${counterKeyframes} ${({ time }) => time + 's'};
  animation-delay: 1s;
`;

const Toast = ({ mode, message, delay, handleClose }) => {
  const delayInSec = delay / SEC_IN_MS;
  const counterTime = (delay - SLIDE_DELAY) / SEC_IN_MS;

  return (
    <ToastBox onClick={handleClose} mode={mode} delay={delayInSec}>
      {message}
      <Counter time={counterTime} />
    </ToastBox>
  );
};

export default Toast;
