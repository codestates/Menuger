import styled from 'styled-components';

const StandardButtonStyle = styled.button`
  width: ${props => props.width || 'fit-content'};
  height: ${props => props.height || '35px'};
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor || 'rgba(0, 0, 0, 0)'};
  font-size: ${props => props.fontSize};
  border: solid 1px #000;
  border-radius: 5px;
  padding: 0 10px;
  cursor: pointer;

  //유틸함수 사용하기 (어둡게, 밝게)
  &:hover {
    background-color: #a2a2a2;
  }

  &:active {
    background-color: #c6c6c6;
  }
`;

const StandardButton = ({ children, width, height, color, backgroundColor, fontSize, onClick }) => {
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
      onClick={onClick}
    >
      {children}
    </StandardButtonStyle>
  );
};

export default StandardButton;
