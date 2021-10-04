import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { toggleTheme } from '../modules/theme';
import { FiMoon, FiSun } from 'react-icons/fi';

const SvgContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0.4rem;
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

const useDarkToggle = () => {
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleTheme());

  return () => (
    <SvgContainer onClick={handleToggle}>
      {!isDarkMode && <FiMoon size="100%" color="#333" strokeWidth="1.5" />}
      {isDarkMode && <FiSun size="100%" color="#ffcd36" strokeWidth="1.5" />}
    </SvgContainer>
  );
};

export default useDarkToggle;
