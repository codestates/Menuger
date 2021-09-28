import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #cdc5bf;
  font-size: 1.1rem;
  &:focus {
    outline: none;
    border-bottom: 2px solid #222222;
    margin-bottom: -1px;
  }
`;

const ValidationMessage = styled.div`
  position: absolute;
  top: 30px;
  color: ${({ isValid }) => (isValid ? '#07bc0c' : '#e74c3c')};
`;

const InputForm = ({ placeholder, validate, type, disabled }, ref) => {
  const inputRef = useRef();
  const [input, setInput] = useState('');
  const [validation, setValidation] = useState(null);

  const handleChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (!input.trim()) {
      return;
    }
    const timerId = setTimeout(() => {
      validate(input).then(({ result, message }) => {
        setValidation({ result, message });
      });
    }, 1000);

    return () => clearTimeout(timerId);
  }, [input, validate]);

  useImperativeHandle(ref, () => ({
    getInput: () => input,
    getValidation: () => !!validation?.result,
    focusInputRef: () => inputRef.current.focus(),
  }));

  return (
    <Wrapper>
      <Input
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        disabled={disabled}
        ref={inputRef}
      />
      {input.length > 0 && (
        <ValidationMessage isValid={!!validation?.result}>{validation?.message}</ValidationMessage>
      )}
    </Wrapper>
  );
};

export default forwardRef(InputForm);
