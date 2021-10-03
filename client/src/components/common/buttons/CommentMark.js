import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { AiOutlineComment } from 'react-icons/ai';

const CommentMarkStyle = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: ${props => props.width || '13px'};
  height: ${props => props.height || '34px'};
  background-color: transparent;
  border: none;
  cursor: pointer;

  > :nth-child(1) {
    font-size: ${props => props.imageSize || '150%'};
    color: ${({ active }) => (active ? darken(0.2, '#9be998') : '#424242')};
    -webkit-text-stroke: 1px #000;
  }

  > :nth-child(2) {
    color: rgba(66, 66, 66);
    font-size: ${props => props.fontSize || '0.5rem'};
  }

  &:hover {
    * {
      color: ${props => lighten(0.1, props.backgroundColor || 'gray')};
    }
  }
`;

const CommentMark = ({
  number,
  width,
  height,
  color,
  backgroundColor,
  fontSize,
  borderRadius,
  onClick,
  imageSize,
}) => {
  return (
    <CommentMarkStyle
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      borderRadius={borderRadius}
      onClick={onClick}
      number={number}
      imageSize={imageSize}
    >
      <AiOutlineComment />
      <span>{number}</span>
    </CommentMarkStyle>
  );
};

export default CommentMark;
