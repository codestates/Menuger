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
import useModal from '../hooks/useModal';
import RecipePost from '../components/recipe/RecipePost';

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
  const [recipeData, setRecipeData] = useState();
  const location = useLocation();
  const history = createBrowserHistory({ forceRefresh: true });
  const query = useQuery();
  const { showModal, ModalContainer } = useModal({
    width: 100,
    height: 90,
    padding: 2.5,
    overflow: 'hidden',
  });

  const fetchMoreRef = useRef();
  const intersecting = useInfiniteScroll(fetchMoreRef);

  const loadSortedRecipes = option => history.push(`recipes?sort=${option}`);
  const sortOption = query.get('sort'); // || 'dd';
  const curMenu = sortOptions.indexOf(sortOption);
  const { showDropdown, DropdownContainer } = useDropdown(sortMenus, curMenu, loadSortedRecipes);

  const fetchRecipes = async () => {
    const {
      data: { recipes },
    } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes`, {
      params: {
        page,
        sort: sortOptionMapper[sortOption],
        like: sortOption === 'p' ? -1 : null,
        comment: sortOption === 'c' ? -1 : null,
      },
    });

    if (!recipes.length) {
      return setHasNext(false);
    }
    setPage(page => page + 1);
    setCards(prevRecipes => [...prevRecipes, ...recipes]);

    const postId = location?.state?.postId;
    if (postId) {
      delete location.state.postId;
      const {
        data: { recipe },
      } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes/${postId}`);
      setRecipeData(recipe);
      showModal();
    }
  };

  useEffect(() => {
    if (!sortOption) {
      history.push('recipes?sort=dd');
    }
    setCards([]);
  }, [sortOption]);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchRecipes();
    }
  }, [intersecting, hasNext]);

  const handleCardClick = async postId => {
    const {
      data: { recipe },
    } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes/${postId}`);
    setRecipeData(recipe);
    showModal();
  };

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
      <CardList
        cards={cards}
        ref={fetchMoreRef}
        hasNext={hasNext}
        handleCardClick={handleCardClick}
      />
      <ModalContainer>
        <RecipePost {...recipeData}></RecipePost>
      </ModalContainer>
    </Wrapper>
  );
};

export default RecipePage;
