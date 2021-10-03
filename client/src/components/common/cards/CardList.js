import { forwardRef } from 'react';
import styled from 'styled-components';

import CardItem from './CardItem';
import svgToComponent from '../../../utils/svg';
import scrollToTop from '../../../utils/scroll';
import { HiOutlineArrowCircleUp } from 'react-icons/hi';

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const CardListContainer = styled.ul`
  padding: 1rem 1.5rem;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1rem;
  }
`;

const ScrollEnd = styled.div`
  display: flex;
  justify-content: center;
  height: 70px;
`;

const ScrollToTop = styled.div`
  position: fixed;
  z-index: 7;
  right: 10px;
  bottom: 10px;
  font-size: 50px;
  color: #ffc436;
  :hover {
    color: #fc9f77;
    cursor: pointer;
  }
`;

const CardList = forwardRef(({ cards, hasNext, handleCardClick }, fetchMoreRef) => {
  const arrowDownConfig = { svgName: 'arrowDown', props: { width: 200 } };

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
              updatedAt={card.updatedAt}
              handleCardClick={handleCardClick}
            />
          ))}
        </CardListContainer>
      </Wrapper>
      <ScrollEnd ref={fetchMoreRef}>
        {hasNext && cards.length > 0 && svgToComponent(arrowDownConfig)}
        <ScrollToTop onClick={scrollToTop}>
          <HiOutlineArrowCircleUp />
        </ScrollToTop>
      </ScrollEnd>
    </>
  );
});

export default CardList;
