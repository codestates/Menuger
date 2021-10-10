import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';
import axios from 'axios';

import { setInteraction } from '../modules/interaction';
import { setList } from '../modules/list';
import CardList from '../components/common/cards/CardList';
import DietPost from '../components/diet/DietPost';
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

const DietPage = () => {
  const userInfo = useSelector(state => state.user);
  const { isDarkMode } = useSelector(state => state.theme);

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [dietPostInfo, setDietPostInfo] = useState({ diet: {}, comments: [] });
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
  const loadSortedDiets = option => {
    if (input?.trim().length) {
      localStorage.setItem('option', '/diets');
      localStorage.setItem('searched', input);
    }
    refreshedHistory.push({
      pathname: '/diets',
      search: `?sort=${option}`,
      state: { input },
    });
  };
  const { showDropdown, DropdownContainer } = useDropdown(sortMenus, curMenu, loadSortedDiets);

  const handleCardClick = async postId => {
    try {
      const [
        {
          data: { diet },
        },
        {
          data: { comments },
        },
      ] = await Promise.all([
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/diets/${postId}`),
        axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/diets/${postId}/comments`),
      ]);
      setDietPostInfo({ diet, comments });
      showModal();
    } catch (err) {
      console.log(err);
      gotoMain();
    }
  };

  const fetchDiets = async () => {
    setIsDoneFetching(false);
    let fetchedDiets;
    if (input) {
      // 검색어로 접근
      try {
        const {
          data: { diets },
        } = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_URL}/diets?${getQueryStrByInput(input)}`,
          {
            params: {
              page,
              sort: sortOptionMapper[sortOption],
              like: sortOption === 'p' ? -1 : null,
              comment: sortOption === 'c' ? -1 : null,
            },
          },
        );
        fetchedDiets = diets;
      } catch (err) {
        console.log(err);
        gotoMain();
      }
    } else {
      // 헤더를 통해 접근
      try {
        const {
          data: { diets },
        } = await axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/diets`, {
          params: {
            page,
            sort: sortOptionMapper[sortOption],
            like: sortOption === 'p' ? -1 : null,
            comment: sortOption === 'c' ? -1 : null,
          },
        });
        fetchedDiets = diets;
      } catch (err) {
        console.log(err);
        gotoMain();
      }
    }

    if (!fetchedDiets.length) {
      setHasNext(false);
      setIsDoneFetching(true);
      return;
    }
    setPage(page => page + 1);
    dispatch(setList([...cards, ...fetchedDiets]));
    setCards(prevDiets => [...prevDiets, ...fetchedDiets]);

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
        pathname: '/diets',
        search: '?sort=dd',
      });
      return;
    }
  }, [sortOption]);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchDiets();
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
        postType="diets"
        isDoneSearching={isDoneFetching}
        cards={cards}
        ref={fetchMoreRef}
        handleCardClick={handleCardClick}
      />
      <ModalContainer>
        <DietPost post={dietPostInfo.diet} comments={dietPostInfo.comments}></DietPost>
      </ModalContainer>
    </Wrapper>
  );
};

export default DietPage;
