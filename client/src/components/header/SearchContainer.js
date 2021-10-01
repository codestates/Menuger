import React, { useState, useRef, useCallback } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: solid 2px;
  height: 40px;
  &:focus-within {
    border: 2px solid #ffc436;
  }
  * {
    border: 0px;
    height: 100%;
  }
  > :focus {
    outline: none;
  }
  input {
    padding-left: 5px;
    padding-right: 3px;
    width: 150px;
  }
  select {
    background-color: white;
    padding-left: 1em;
  }
  @media screen and (max-width: 768px) {
    display: none;
    ${props =>
      props.useSearch &&
      css`
        right: 0px;
        display: block;
        position: absolute;
        align-items: center;
        justify-content: center;
        margin-top: 120px;
      `}
  }
`;

const SearchContainer = ({ useSearch }) => {
  const [selected, setSelected] = useState('레시피');
  const [search, setSearch] = useState('');

  const handleSelect = e => {
    setSelected(e.target.value);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const onClickEvent = async e => {
    if (e.key === 'Enter') {
      await axios.post(`http://localhost:80/search`, {
        postType: selected,
        input: search,
      });
    }
  };

  return (
    <Container useSearch={useSearch} onKeyPress={onClickEvent}>
      <select onChange={handleSelect}>
        <option value="레시피">레시피</option>
        <option value="식단">식단</option>
      </select>
      <input type="text" onChange={handleSearch}></input>
    </Container>
  );
};

export default SearchContainer;
