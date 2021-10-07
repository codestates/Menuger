import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & > svg {
    fill: ${({ active }) => active && '#ffcd36'};
    &:hover {
      fill: ${({ active }) => (active ? '#ffe69a' : '#b3b3b3')};
    }
  }
`;

const Counter = styled.div`
  text-align: center;
  color: #606060;
`;

const PostInfoButton = ({ children, onClick, active, count = -1 }) => {
  return (
    <Wrapper onClick={onClick} active={active}>
      {children}
      {count >= 0 && <Counter>{count}</Counter>}
    </Wrapper>
  );
};

export default PostInfoButton;
