import { useState } from 'react';
import styled from 'styled-components';

import { AiOutlineLike } from 'react-icons/ai';

const SpanStyle = styled.span``;

const IconSytle = styled.div``;

const LikeButtonStyle = styled.button`
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
    & > svg {
      fill: ${({ active }) => active && '#ffcd36'};
      &:hover {
        fill: ${({ active }) => (active ? '#ffe69a' : '#b3b3b3')};
      }
    }
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
  const [isActive, setIsActive] = useState(active);
  const [count, setCount] = useState(number);

  const handleClick = () => {
    if (isActive) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    onClick(isActive);
    setIsActive(!isActive);
  };

  return (
    <LikeButtonStyle
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      borderRadius={borderRadius}
      onClick={handleClick}
      number={count}
      imageSize={imageSize}
      active={isActive}
    >
      <IconSytle>
        <AiOutlineLike />
      </IconSytle>
      <SpanStyle>{count}</SpanStyle>
    </LikeButtonStyle>
  );
};

export default LikeButton;
