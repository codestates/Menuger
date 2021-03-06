import { forwardRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import CardItem from './CardItem';
import NoResult from '../NoResult';
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
  height: 1px;
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

const CardList = forwardRef(
  ({ postType, isDoneSearching, cards, handleCardClick }, fetchMoreRef) => {
    const { isDarkMode } = useSelector(state => state.theme);
    const interaction = useSelector(state => state.interaction[postType]);
    const { list } = useSelector(state => state.list);

    const isActive = (type, postId) => {
      if (type === 'bookmark') {
        return interaction.bookmarkIds.includes(postId);
      }
      if (type === 'like') {
        return interaction.likeIds.includes(postId);
      }
    };

    const getCount = (postId, type) => {
      const card = list.filter(({ _id }) => _id === postId)?.[0];
      if (type === 'comments') {
        return card.commentsCount;
      }
      if (type === 'likes') {
        return card.likesCount;
      }
      if (type === 'bookmarks') {
        return card.bookmarksCount;
      }
    };

    return (
      <>
        <Wrapper isDark={isDarkMode}>
          <CardListContainer>
            {cards.map(card => (
              <CardItem
                key={card._id}
                postId={card._id}
                postType={postType}
                title={card.title}
                thumbnail_url={card.thumbnail_url}
                originalFileName={card.originalFileName}
                user={card.user}
                commentsCount={getCount(card._id, 'comments')}
                likesCount={getCount(card._id, 'likes')}
                bookmarksCount={getCount(card._id, 'bookmarks')}
                hashtags={card.hashtags}
                createdAt={card.createdAt}
                handleCardClick={handleCardClick}
                isBookmarked={isActive('bookmark', card._id)}
                isLiked={isActive('like', card._id)}
              />
            ))}
          </CardListContainer>
          {isDoneSearching && cards.length === 0 && <NoResult />}
        </Wrapper>
        <ScrollEnd ref={fetchMoreRef} />
        <ScrollToTop onClick={scrollToTop}>
          <HiOutlineArrowCircleUp />
        </ScrollToTop>
      </>
    );
  },
);

export default CardList;
