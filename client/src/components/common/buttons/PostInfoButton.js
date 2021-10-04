import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
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
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const PostInfoButton = ({ children, onClick, active, disabled, count, num }) => {
  return (
    <Wrapper onClick={onClick} active={active} disabled={disabled}>
      {children}
      {count >= 0 && <Counter>{num}</Counter>}
    </Wrapper>
  );
};

export default PostInfoButton;
