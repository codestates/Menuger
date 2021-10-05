import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: solid 2px #3c4043;
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
    flex-grow: 1;
  }
  select {
    background-color: white;
    padding-left: 1em;
    color: #3c4043;
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

const SearchContainer = ({ useSearch, searchInputRef }) => {
  const [selected, setSelected] = useState('레시피');
  const [search, setSearch] = useState('');

  const handleSelect = e => {
    setSelected(e.target.value);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const typeMapper = { 레시피: '/recipes', 식단: '/diets' };
  const history = useHistory();

  const onClickEvent = async e => {
    if (e.key === 'Enter') {
      history.push({
        pathname: typeMapper[selected],
        search: '?sort=dd',
        state: { input: search },
      });
    }
  };

  return (
    <Container useSearch={useSearch} onKeyPress={onClickEvent} ref={searchInputRef}>
      <select onChange={handleSelect}>
        <option value="레시피">레시피</option>
        <option value="식단">식단</option>
      </select>
      <input type="text" onChange={handleSearch}></input>
    </Container>
  );
};

export default SearchContainer;
