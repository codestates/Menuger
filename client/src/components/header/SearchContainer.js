import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
    ${props =>
      props.useSearch &&
      css`
        padding-top: 100px;
        right: 0px;
        display: block;
        position: absolute;
        align-items: center;
        justify-content: center;
      `}
  }
`;

const SearchContainer = ({ useSearch }) => {
  return (
    <Container useSearch={useSearch}>
      <select name="드롭다운" id="">
        <option value="레시피">레시피</option>
        <option value="식단">식단</option>
      </select>
      <input></input>
    </Container>
  );
};

export default SearchContainer;
