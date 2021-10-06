import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import axios from 'axios';

import CardList from '../../components/common/cards/CardList';
import RecipePost from '../../components/recipe/RecipePost';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useDropdown from '../../hooks/useDropdown';
import useQuery from '../../hooks/useQuery';
import useModal from '../../hooks/useModal';
import svgToComponent from '../../utils/svg';
import { sortOptions, sortMenus, sortOptionMapper } from '../../utils/sort';
import { resetPostInfo } from '../../modules/post';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;

  .sc-bZSRNg {
    display: none;
  }
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
  color: ${({ isDark }) => (isDark ? 'white' : '#3c4043')};
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & > svg {
    fill: ${({ isDark }) => isDark && 'white'};
  }
`;

const MyRecipe = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [recipeData, setRecipeData] = useState();
  const { postType, postId } = useSelector(state => state.post);
  const { nickname } = useSelector(state => state.user);
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const query = useQuery();
  const { showModal, ModalContainer } = useModal({
    width: 100,
    height: 90,
    padding: 2.5,
    overflow: 'hidden',
  });

  const fetchMoreRef = useRef();
  const intersecting = useInfiniteScroll(fetchMoreRef);
  const historyRef = useRef();
  const getHistory = useCallback(() => {
    if (!historyRef.current) {
      historyRef.current = createBrowserHistory({ forceRefresh: true });
    }
    return historyRef.current;
  }, []);

  const loadSortedRecipes = option => getHistory().push(`recipes?sort=${option}`);
  const sortOption = query.get('sort');
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
        user: nickname,
      },
    });
    if (!recipes.length) {
      return setHasNext(false);
    }
    setPage(page => page + 1);
    setCards(prevRecipes => [...prevRecipes, ...recipes]);
    if (postType === 'recipes' && postId) {
      try {
        const {
          data: { recipe },
        } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/${postType}/${postId}`);
        setRecipeData(recipe);
        showModal();
      } catch (err) {
        console.log(err);
        getHistory().push('recipes?sort=dd');
      } finally {
        dispatch(resetPostInfo());
      }
    }
  };

  useEffect(() => {
    if (!sortOption) {
      getHistory().push('recipes?sort=dd');
    }
    setCards([]);
  }, [sortOption, getHistory]);

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
    <Wrapper isDark={isDarkMode}>
      <SortMenu>
        <SortIconAndText onClick={showDropdown} isDark={isDarkMode}>
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

export default MyRecipe; //수정
