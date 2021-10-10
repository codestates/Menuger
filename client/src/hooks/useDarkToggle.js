import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleTheme } from '../modules/theme';
import { FiMoon, FiSun } from 'react-icons/fi';

const SvgContainer = styled.div`
  position: fixed;
  bottom: 5rem;
  right: 0.9rem;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 4px solid #ffcd36;
  padding: 0.4rem;
  z-index: 20;
  &:hover {
    cursor: pointer;
    border-color: #fc9f77;
    & > svg {
      fill: #fc9f77;
    }
  }
`;

const useDarkToggle = () => {
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTheme());

  return () => (
    <SvgContainer onClick={handleToggle} isDarkMode={isDarkMode}>
      {!isDarkMode && <FiMoon size="100%" color="#ffcd36" strokeWidth="1.5" fill="#ffcd36" />}
      {isDarkMode && <FiSun size="100%" color="#ffcd36" strokeWidth="1.5" />}
    </SvgContainer>
  );
};

export default useDarkToggle;
