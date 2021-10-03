import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { AiFillLike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';

const LikeButtonStyle = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: ${props => props.width || '15px'};
  height: ${props => props.height || '34px'};
  background-color: transparent;
  border: none;
  cursor: pointer;

  > :nth-child(1) {
    font-size: ${props => props.imageSize || '200%'};
    color: ${({ active }) => (active ? darken(0.2, '#87e0f3') : '#424242')};
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

const LikeButton = ({
  number,
  width,
  height,
  color,
  backgroundColor,
  fontSize,
  borderRadius,
  onClick,
  imageSize,
  active,
}) => {
  return (
    <LikeButtonStyle
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      borderRadius={borderRadius}
      onClick={onClick}
      number={number}
      imageSize={imageSize}
      active={active}
    >
      {active ? <AiFillLike /> : <AiOutlineLike />}

      <span>{number}</span>
    </LikeButtonStyle>
  );
};

export default LikeButton;
