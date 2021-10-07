import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import axios from 'axios';

import { setInteraction } from '../modules/interaction';
import CardList from '../components/common/cards/CardList';
import RecipePost from '../components/recipe/RecipePost';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useDropdown from '../hooks/useDropdown';
import useQuery from '../hooks/useQuery';
import useModal from '../hooks/useModal';
import svgToComponent from '../utils/svg';
import { sortOptions, sortMenus, sortOptionMapper } from '../utils/sort';
import getQueryStrByInput from '../utils/search';

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
  color: ${({ isDark }) => (isDark ? 'white' : '#3c4043')};
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  & > svg {
    fill: ${({ isDark }) => isDark && 'white'};
  }
`;

const RecipePage = () => {
  const userInfo = useSelector(state => state.user);
  const { isDarkMode } = useSelector(state => state.theme);

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [recipePostInfo, setRecipePostInfo] = useState({ recipe: {}, comments: [] });
  const [isDoneFetching, setIsDoneFetching] = useState(false);

  const fetchMoreRef = useRef();
  const intersecting = useInfiniteScroll(fetchMoreRef);
  const modalConfig = { width: 100, height: 90, padding: 2.5, overflow: 'hidden' };
  const { showModal, ModalContainer } = useModal(modalConfig);

  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const refreshedHistory = createBrowserHistory({ forceRefresh: true });
  const location = useLocation();

  const gotoMain = () => history.push('/');
  const { input, postId } = location?.state || {};
  const sortOption = query.get('sort');
  const curMenu = sortOptions.indexOf(sortOption);
  const loadSortedRecipes = option => {
    if (input?.trim().length) {
      localStorage.setItem('option', '/recipes');
      localStorage.setItem('searched', input);
    }
    refreshedHistory.push({
      pathname: '/recipes',
      search: `?sort=${option}`,
      state: { input },
    });
  };
  const { showDropdown, DropdownContainer } = useDropdown(sortMenus, curMenu, loadSortedRecipes);

  const handleCardClick = async postId => {
    try {
      const [
        {
          data: { recipe },
        },
        {
          data: { comments },
        },
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes/${postId}`),
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/recipes/${postId}/comments`),
      ]);
      setRecipePostInfo({ recipe, comments });
      console.log(recipe);
      showModal();
    } catch (err) {
      console.log(err);
      gotoMain();
    }
  };

  const fetchRecipes = async () => {
    setIsDoneFetching(false);
    let fetchedRecipes;
    if (input) {
      // 검색어로 접근
      try {
        const {
          data: { recipes },
        } = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_URL}/recipes?${getQueryStrByInput(input)}`,
          {
            params: {
              page,
              sort: sortOptionMapper[sortOption],
              like: sortOption === 'p' ? -1 : null,
              comment: sortOption === 'c' ? -1 : null,
            },
          },
        );
        fetchedRecipes = recipes;
      } catch (err) {
        console.log(err);
        gotoMain();
      }
    } else {
      // 헤더를 통해 접근
      try {
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
        fetchedRecipes = recipes;
      } catch (err) {
        console.log(err);
        gotoMain();
      }
    }

    if (!fetchedRecipes.length) {
      setHasNext(false);
      setIsDoneFetching(true);
      return;
    }
    setPage(page => page + 1);
    setCards(prevRecipes => [...prevRecipes, ...fetchedRecipes]);

    if (postId) {
      try {
        handleCardClick(postId);
        delete location.state.postId;
      } catch (err) {
        console.log(err);
        gotoMain();
      }
    }
    setIsDoneFetching(true);
  };

  useEffect(() => {
    if (!userInfo?.nickname) {
      return;
    }
    Promise.all([
      axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/users/${userInfo.nickname}/interaction/recipes`,
        {
          withCredentials: true,
        },
      ),
      axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/users/${userInfo.nickname}/interaction/diets`,
        {
          withCredentials: true,
        },
      ),
    ]).then(responses => {
      dispatch(
        setInteraction({
          recipes: responses[0].data,
          diets: responses[1].data,
        }),
      );
    });
  }, []);

  useEffect(() => {
    if (!sortOption) {
      history.push({
        pathname: '/recipes',
        search: '?sort=dd',
      });
      return;
    }
  }, [sortOption]);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchRecipes();
    }
  }, [intersecting, hasNext]);

  return (
    <Wrapper isDark={isDarkMode}>
      {!(isDoneFetching && cards.length === 0) && (
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
      )}
      <CardList
        postType="recipes"
        isDoneSearching={isDoneFetching}
        cards={cards}
        ref={fetchMoreRef}
        handleCardClick={handleCardClick}
      />
      <ModalContainer>
        <RecipePost post={recipePostInfo.recipe} comments={recipePostInfo.comments}></RecipePost>
      </ModalContainer>
    </Wrapper>
  );
};

export default RecipePage;
