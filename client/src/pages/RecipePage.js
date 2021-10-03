import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import axios from 'axios';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import CardList from '../components/common/cards/CardList';
import svgToComponent from '../utils/svg';
import useDropdown from '../hooks/useDropdown';
import useQuery from '../hooks/useQuery';
import { sortOptions, sortMenus, sortOptionMapper } from '../utils/sort';

const Wrapper = styled.div`
  max-width: 1130px;
  margin: 0 auto;
`;

const SortMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin: 2rem 1.5rem 1rem 0;
  @media (max-width: 768px) {
    padding-right: 1rem;
  }
`;

const SortIconAndText = styled.div`
  display: flex;
  gap: 0.5em;
  color: #3c4043;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const RecipePage = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const location = useLocation();
  const history = createBrowserHistory({ forceRefresh: true });
  const query = useQuery();

  const fetchMoreRef = useRef();
  const intersecting = useInfiniteScroll(fetchMoreRef);

  const loadSortedRecipes = option => history.push(`recipes?sort=${option}`);
  const sortOption = query.get('sort') || 'dd';
  const curMenu = sortOptions.indexOf(sortOption);
  const { showDropdown, DropdownContainer } = useDropdown(sortMenus, curMenu, loadSortedRecipes);
  const postId = location?.state?.postId;

  const fetchRecipes = async () => {
    const {
      data: { recipes },
    } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes`, {
      params: {
        page,
        sort: sortOptionMapper[sortOption],
      },
    });

    if (!recipes.length) {
      return setHasNext(false);
    }
    setPage(page => page + 1);
    setCards(prevRecipes => [...prevRecipes, ...recipes]);
  };

  useEffect(() => {
    setCards([]);
  }, [sortOption]);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchRecipes();
    }
  }, [intersecting, hasNext]);

  return (
    <Wrapper>
      <SortMenu>
        <SortIconAndText onClick={showDropdown}>
          {svgToComponent({
            svgName: 'sortIcon',
            props: { width: 25, height: 25, display: 'block' },
          })}
          {sortMenus[curMenu]}
        </SortIconAndText>
        <DropdownContainer />
      </SortMenu>
      <CardList cards={cards} ref={fetchMoreRef} hasNext={hasNext} />
    </Wrapper>
  );
};

export default RecipePage;
