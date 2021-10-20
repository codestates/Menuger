import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
  & > svg {
    fill: ${({ isDark }) => (isDark ? 'white' : 'black')};
    fill: ${({ active }) => active && '#ffcd36'};
    fill: ${({ disabled }) => disabled && 'gray'};
    &:hover {
      fill: ${({ active }) => (active ? '#ffe69a' : '#b3b3b3')};
      fill: ${({ disabled }) => disabled && 'gray'};
    }
  }
`;

const Counter = styled.div`
  text-align: center;
  color: ${({ isDark }) => (isDark ? 'white' : 'black')};
`;

const PostInfoButton = ({ children, onClick, active, count = -1, disabled }) => {
  const { isDarkMode } = useSelector(state => state.theme);

  return (
    <Wrapper onClick={onClick} active={active} disabled={disabled} isDark={isDarkMode}>
      {children}
      {count >= 0 && <Counter isDark={isDarkMode}>{count}</Counter>}
    </Wrapper>
  );
};

export default PostInfoButton;
