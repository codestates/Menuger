import { forwardRef } from 'react';
import styled from 'styled-components';

import CardItem from './CardItem';
import svgToComponent from '../../../utils/svg';
import scrollToTop from '../../../utils/scroll';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const CardListContainer = styled.ul`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }
`;

const ScrollEnd = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = forwardRef(({ cards, hasNext }, fetchMoreRef) => {
  const arrowDownConfig = { svgName: 'arrowDown' };
  const arrowUpConfig = { svgName: 'arrowUp', props: { onClick: scrollToTop, cursor: 'pointer' } };

  return (
    <>
      <Wrapper>
        <CardListContainer>
          {cards.map(card => (
            <CardItem
              key={card.postId}
              postId={card.postId}
              postType={card.postType}
              title={card.title}
              subscribed={card.subscribed}
              img={card.img}
              imgFileName={card.imgFileName}
              userInfo={card.userInfo}
              postInfo={card.postInfo}
              tagInfo={card.tagInfo}
            />
          ))}
        </CardListContainer>
      </Wrapper>
      <ScrollEnd ref={fetchMoreRef}>
        {hasNext && cards.length > 0 && svgToComponent(arrowDownConfig)}
        {!hasNext && svgToComponent(arrowUpConfig)}
      </ScrollEnd>
    </>
  );
});

export default CardList;
