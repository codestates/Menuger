import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { createBrowserHistory } from 'history';

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
  const [selected, setSelected] = useState('/recipes');
  const [search, setSearch] = useState('');
  const history = createBrowserHistory({ forceRefresh: true });

  useEffect(() => {
    const searched = localStorage.getItem('searched');
    if (searched?.trim()?.length) {
      setSearch(searched);
      localStorage.removeItem('searched');
    }
  }, []);

  const handleSelect = ({ target }) => {
    setSelected(target.value);
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const onClickEvent = async ({ key }) => {
    if (key === 'Enter') {
      if (!search.trim().length) {
        return;
      }
      localStorage.setItem('searched', search);
      history.push({
        pathname: selected,
        search: '?sort=dd',
        state: { input: search },
      });
    }
  };

  return (
    <Container useSearch={useSearch} onKeyPress={onClickEvent} ref={searchInputRef}>
      <select onChange={handleSelect}>
        <option value="/recipes">레시피</option>
        <option value="/diets">식단</option>
      </select>
      <input type="text" onChange={handleSearch} value={search} />
    </Container>
  );
};

export default SearchContainer;
