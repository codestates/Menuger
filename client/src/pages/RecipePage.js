import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import CardList from '../components/common/cards/CardList';
import fetchCards from '../components/recipe/dummy';
import svgToComponent from '../utils/svg';

const Wrapper = styled.div`
  max-width: 1130px;
  margin: 0 auto;
`;

const SortMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5em;
  color: #030303;
  margin: 2rem 0 1rem;
  padding: 0 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const SortOption = styled.div`
  font-size: 1.1rem;
`;

const RecipePage = () => {
  const [cards, setCards] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const location = useLocation();
  const fetchMoreRef = useRef(); // CardList 하단에 삽입된 태그에 대한 ref를 설정하기 위함
  const intersecting = useInfiniteScroll(fetchMoreRef);

  useEffect(() => {
    const postId = location?.state?.postId;
    if (postId) {
      console.log(`${postId} 조회하기`);
    }
  }, []);

  useEffect(() => {
    if (intersecting && hasNext) {
      fetchCards(cards.length, 12).then(newCards => {
        if (newCards.length === 0) {
          setHasNext(false);
          return;
        }
        setCards(oldCards => [...oldCards, ...newCards]); // server 로 부터 응답받은 cards를 기존의 state에 추가
      });
    }
  }, [intersecting, hasNext]);

  return (
    <Wrapper>
      <SortMenu>
        {svgToComponent({
          svgName: 'sortIcon',
          props: { width: 25, height: 25, display: 'block' },
        })}
        <SortOption>정렬</SortOption>
      </SortMenu>
      <CardList cards={cards} ref={fetchMoreRef} hasNext={hasNext} />
    </Wrapper>
  );
};

export default RecipePage;
