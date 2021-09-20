import { useEffect } from 'react';

const useKeyPress = (key, cb) => {
  useEffect(() => {
    const onKeyDown = e => {
      if (e.key === key) cb();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, cb]);
};

export default useKeyPress;
