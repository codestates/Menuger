import styled from 'styled-components';
import { darken, lighten } from 'polished';

import { AiOutlineComment } from 'react-icons/ai';

const SpanStyle = styled.span``;

const IconSytle = styled.div``;

const CommentMarkStyle = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: ${props => props.width || '2em'};
  height: ${props => props.height || '2em'};
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${IconSytle} {
    font-size: ${props => props.imageSize || '2em'};
    color: ${({ active }) => (active ? darken(0.2, '#87e0f3') : '#424242')};
  }

  ${SpanStyle} {
    color: rgba(66, 66, 66);
    font-size: ${props => props.fontSize || '1em'};
  }

  &:hover {
    * {
      color: ${props => lighten(0.1, props.backgroundColor || 'gray')};
    }
  }

  @media (max-width: 768px) {
    width: 15vw;
    height: 4em;
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 3em;
    }
    ${SpanStyle} {
      font-size: 1.5em;
    }
  }
  @media (max-width: 900px) {
    width: 2em;
    height: 4em;
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 2.5em;
    }
    ${SpanStyle} {
      font-size: 1.5em;
    }
  }
  @media (max-width: 1200px) {
    width: 2em;
    height: 3em;
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 2.2em;
    }
    ${SpanStyle} {
      font-size: 1.3em;
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
      <IconSytle>
        <AiOutlineComment />
      </IconSytle>
      <SpanStyle>{number}</SpanStyle>
    </CommentMarkStyle>
  );
};

export default CommentMark;
