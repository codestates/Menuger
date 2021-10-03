import styled from 'styled-components';
import { darken, lighten } from 'polished';

const StandardButtonStyle = styled.button`
  width: ${props => props.width || 'fit-content'};
  height: ${props => props.height || '35px'};
  color: ${props => props.color || '#ffffff'};
  background-color: ${props => props.backgroundColor || '#ffc436'};
  font-size: ${props => props.fontSize || '1rem'};
  border: ${props => props.border || 'none'};
  border-radius: ${props => props.borderRadius || '5px'};
  padding: ${props => props.padding || '0 10px'};
  cursor: pointer;

  &:hover {
    background-color: ${props => lighten(0.1, props.backgroundColor || '#ffc436')};
  }

  &:active {
    background-color: ${props => darken(0.1, props.backgroundColor || '#ffc436')};
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

/*
default
  width: 'fit-content'
  height: '35px'
  color: '#ffffff'
  background-color: '#ffc436'
  font-size: '1rem'
  border: 'none'
  border-radius: '5px'
*/

const StandardButton = ({
  children,
  width,
  height,
  color,
  backgroundColor,
  fontSize,
  border,
  borderRadius,
  onClick,
  padding,
  disabled = false,
}) => {
  if (typeof onClick !== 'function') {
    onClick = () => {};
  }
  return (
    <StandardButtonStyle
      width={width}
      height={height}
      color={color}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      border={border}
      borderRadius={borderRadius}
      onClick={onClick}
      padding={padding}
      disabled={disabled}
    >
      {children}
    </StandardButtonStyle>
  );
};

export default StandardButton;
