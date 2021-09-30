import { useEffect, useRef, useState } from 'react';
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
  &:hover {
    cursor: pointer;
  }
  margin: 2rem 0 1rem;
`;

const SortOption = styled.div`
  font-size: 1.1rem;
`;

const RecipePage = () => {
  const [cards, setCards] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const fetchMoreRef = useRef(); // CardList 하단에 삽입된 태그에 대한 ref를 설정하기 위함
  const intersecting = useInfiniteScroll(fetchMoreRef);

  useEffect(() => {
    if (intersecting && hasNext) {
      // 게시물 리스트의 최하단 까지 스크롤한 경우 && load할 수 있는 데이터가 있는 경우
      fetchCards(cards.length, 12).then(newCards => {
        // 12개의 cards 를 추가적으로 fetch
        if (newCards.length === 0) {
          // server로 부터 응답 결과 더 이상 load 할 데이터가 없다면
          setHasNext(false);
          return;
        }
        setCards(oldCards => [...oldCards, ...newCards]); // server 로 부터 응답받은 cards를 기존의 state에 추가
      });
    }
  }, [intersecting, hasNext]);
  //style="pointer-events: none; display: block; width: 100%; height: 100%;"
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
