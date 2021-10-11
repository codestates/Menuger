import { useSelector } from 'react-redux';
import styled from 'styled-components';

import usePostInfoButton from '../../../hooks/usePostInfoButton';
import { BsBookmark, BsBell } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10%;
`;

const PostInfoButtons = ({ postId, postType, bookmarksCount, likesCount, author, authorId }) => {
  const interaction = useSelector(state => state.interaction);
  const { nickname } = useSelector(state => state.user);

  const isActive = type => {
    switch (type) {
      case 'subscribe':
        return interaction[postType].subscribes.includes(authorId);
      case 'bookmark':
        return interaction[postType].bookmarkIds.includes(postId);
      case 'like':
        return interaction[postType].likeIds.includes(postId);
      default:
        return false;
    }
  };

  const SubBtn = usePostInfoButton({
    postId,
    postType,
    active: isActive('subscribe'),
    buttonType: 'subscribe',
    nickname,
    author,
    disabled: author === nickname,
  });
  const BookmarkBtn = usePostInfoButton({
    postId,
    postType,
    active: isActive('bookmark'),
    count: bookmarksCount,
    buttonType: 'bookmark',
    nickname,
    author,
  });
  const LikeBtn = usePostInfoButton({
    postId,
    postType,
    active: isActive('like'),
    count: likesCount,
    buttonType: 'like',
    nickname,
    author,
  });
  const buttonSize = '25px';
  return (
    <Wrapper>
      <SubBtn>{!(author === nickname) && <BsBell size={buttonSize} />}</SubBtn>
      <BookmarkBtn>
        <BsBookmark size={buttonSize} />
      </BookmarkBtn>
      <LikeBtn>
        <AiOutlineLike size={buttonSize} />
      </LikeBtn>
    </Wrapper>
  );
};

export default PostInfoButtons;
