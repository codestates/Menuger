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
              key={card._id}
              postId={card._id}
              postType="recipe"
              title={card.title}
              thumbnail_url={card.thumbnail_url}
              originalFileName={card.originalFileName}
              user={card.user}
              commentsCount={card.commentsCount}
              likesCount={card.likesCount}
              bookmarksCount={card.bookmarksCount}
              hashtags={card.hashtags}
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
