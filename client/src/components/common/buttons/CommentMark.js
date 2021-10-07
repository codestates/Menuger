import styled from 'styled-components';
import { lighten } from 'polished';

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
    font-size: ${props => props.imageSize || '1.5em'};
    color: #424242;
  }

  ${SpanStyle} {
    color: #606060;
    font-size: ${props => props.fontSize || '1em'};
    margin-top: -0.5em;
  }

  @media (max-width: 1200px) {
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 2.5vw;
    }
    ${SpanStyle} {
      font-size: 1.3vw;
    }
  }

  @media (max-width: 900px) {
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 4vw;
    }
    ${SpanStyle} {
      font-size: 2vw;
    }
  }

  @media (max-width: 768px) {
    padding-bottom: 0;
    ${IconSytle} {
      font-size: 6vw;
    }
    ${SpanStyle} {
      font-size: 3vw;
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
